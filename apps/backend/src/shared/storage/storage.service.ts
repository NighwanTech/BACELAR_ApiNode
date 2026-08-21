import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  private readonly uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
  private s3Client: S3Client | null = null;

  private get storageProvider(): string {
    return String(process.env.STORAGE_PROVIDER || 'local').trim().toLowerCase();
  }

  constructor() {
    // Ensure upload directory exists for local storage
    if (this.storageProvider === 'local') {
      const fullPath = path.resolve(this.uploadDir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  /**
   * Uploads a file and returns its access URL
   * @param file The file uploaded via Multer
   * @param folder Optional subfolder inside storage (e.g. 'photos', 'signatures')
   */
  async uploadFile(file: any, folder = ''): Promise<string> {
    if (this.storageProvider === 's3') {
      return this.uploadToS3(file, folder);
    }
    return this.uploadToLocal(file, folder);
  }

  /**
   * Stream/read an object by storage key (e.g. gallery/file.jpg).
   * Used by StorageController so private S3 buckets still display in Admin.
   */
  async getObject(key: string): Promise<{
    body: Buffer | Readable;
    contentType?: string;
    contentLength?: number;
  }> {
    const safeKey = key.replace(/^\/+/, '');
    if (!safeKey || safeKey.includes('..')) {
      throw new NotFoundException('Invalid object key');
    }

    if (this.storageProvider === 's3') {
      return this.getObjectFromS3(safeKey);
    }

    const localPath = path.resolve(this.uploadDir, safeKey);
    const root = path.resolve(this.uploadDir);
    if (!localPath.startsWith(root) || !fs.existsSync(localPath)) {
      throw new NotFoundException(`File not found: ${safeKey}`);
    }

    const body = await fs.promises.readFile(localPath);
    return {
      body,
      contentType: undefined,
      contentLength: body.length,
    };
  }

  /**
   * Convert a stored public/S3 URL into an API-proxied object path when possible.
   */
  toProxyPathFromUrl(url: string): string | null {
    const key = this.extractS3KeyFromUrl(url);
    return key ? `/api/v1/storage/object/${key}` : null;
  }

  extractS3KeyFromUrl(url: string): string | null {
    try {
      const { bucketName, publicBaseUrl, endpoint } = this.getS3Config();
      if (!bucketName) return null;

      const u = new URL(url);
      const pathname = decodeURIComponent(u.pathname).replace(/^\/+/, '');

      // path-style: /{bucket}/{key}
      if (pathname.startsWith(`${bucketName}/`)) {
        return pathname.slice(bucketName.length + 1);
      }

      // public base prefix match
      if (publicBaseUrl) {
        const basePath = new URL(publicBaseUrl).pathname.replace(/^\/+|\/+$/g, '');
        if (basePath && pathname.startsWith(`${basePath}/`)) {
          return pathname.slice(basePath.length + 1);
        }
      }

      // endpoint host + /{bucket}/{key}
      if (endpoint) {
        const epHost = new URL(endpoint).host;
        if (u.host === epHost && pathname.startsWith(`${bucketName}/`)) {
          return pathname.slice(bucketName.length + 1);
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  /**
   * Local filesystem upload logic
   */
  private async uploadToLocal(file: any, folder: string): Promise<string> {
    try {
      const targetFolder = folder ? path.join(this.uploadDir, folder) : this.uploadDir;
      const targetFolderPath = path.resolve(targetFolder);

      // Ensure target subfolder exists
      if (!fs.existsSync(targetFolderPath)) {
        fs.mkdirSync(targetFolderPath, { recursive: true });
      }

      // Generate a unique filename: timestamp + random characters + original extension
      const ext = path.extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const uniqueFilename = `${uniqueSuffix}${ext}`;
      const destinationPath = path.join(targetFolderPath, uniqueFilename);

      // Write file buffer to disk
      await fs.promises.writeFile(destinationPath, file.buffer);

      // Return server-accessible path (e.g. /uploads/photos/unique-filename.jpg)
      const relativePath = folder ? `/uploads/${folder}/${uniqueFilename}` : `/uploads/${uniqueFilename}`;
      return relativePath;
    } catch (error: any) {
      throw new InternalServerErrorException(`Local upload failed: ${error.message}`);
    }
  }

  private getS3Config() {
    const bucketName =
      process.env.S3_BUCKET || process.env.AWS_BUCKET_NAME;
    const region =
      process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
    const accessKeyId =
      process.env.S3_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey =
      process.env.S3_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY;
    const endpoint =
      process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT;
    const publicBaseUrl =
      process.env.S3_PUBLIC_URL ||
      (endpoint && bucketName
        ? `${endpoint.replace(/\/$/, '')}/${bucketName}`
        : undefined);

    return { bucketName, region, accessKeyId, secretAccessKey, endpoint, publicBaseUrl };
  }

  private getS3Client(): S3Client {
    if (this.s3Client) {
      return this.s3Client;
    }

    const { region, accessKeyId, secretAccessKey, endpoint } = this.getS3Config();

    if (!accessKeyId || !secretAccessKey) {
      throw new InternalServerErrorException(
        'S3 credentials are not configured (S3_ACCESS_KEY / S3_SECRET_KEY)',
      );
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      requestHandler: new NodeHttpHandler({
        connectionTimeout: 10_000,
        requestTimeout: 30_000,
      }),
      ...(endpoint
        ? {
            endpoint,
            forcePathStyle: true,
          }
        : {}),
    });

    return this.s3Client;
  }

  private async getObjectFromS3(key: string): Promise<{
    body: Buffer | Readable;
    contentType?: string;
    contentLength?: number;
  }> {
    const { bucketName } = this.getS3Config();
    if (!bucketName) {
      throw new InternalServerErrorException('S3 bucket is not configured (S3_BUCKET)');
    }

    const result = await this.getS3Client().send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );

    if (!result.Body) {
      throw new NotFoundException(`Object not found: ${key}`);
    }

    return {
      body: result.Body as Readable,
      contentType: result.ContentType,
      contentLength: result.ContentLength,
    };
  }

  /**
   * AWS S3 / custom S3-compatible object storage upload.
   * Returns an API proxy path so private buckets still render in Admin/website.
   */
  private async uploadToS3(file: any, folder: string): Promise<string> {
    const { bucketName } = this.getS3Config();

    if (!bucketName) {
      throw new InternalServerErrorException(
        'S3 bucket is not configured (S3_BUCKET)',
      );
    }

    if (!file?.buffer) {
      // Disk-storage fallback (multer default writes to temp file)
      if (file?.path && fs.existsSync(file.path)) {
        file.buffer = await fs.promises.readFile(file.path);
      } else {
        throw new InternalServerErrorException(
          'Uploaded file buffer is missing — ensure Multer memory storage is used',
        );
      }
    }

    try {
      const ext = path.extname(file.originalname || '');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const uniqueFilename = `${uniqueSuffix}${ext}`;
      const key = folder
        ? `${folder.replace(/^\/+|\/+$/g, '')}/${uniqueFilename}`
        : uniqueFilename;

      const client = this.getS3Client();
      const putInput: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype || 'application/octet-stream',
      };

      // Optional: some S3-compatible providers reject ACL / don't support it
      if (process.env.S3_ACL !== 'none') {
        putInput.ACL =
          (process.env.S3_ACL as PutObjectCommandInput['ACL']) || 'public-read';
      }

      try {
        await client.send(new PutObjectCommand(putInput));
      } catch (aclError: any) {
        // Retry without ACL when provider rejects canned ACLs
        if (putInput.ACL) {
          delete putInput.ACL;
          await client.send(new PutObjectCommand(putInput));
        } else {
          throw aclError;
        }
      }

      // Always return MinIO / S3 public URL (never localhost)
      const { publicBaseUrl, endpoint, region } = this.getS3Config();
      if (publicBaseUrl) {
        return `${publicBaseUrl.replace(/\/$/, '')}/${key}`;
      }
      if (endpoint) {
        // path-style: https://s3.host/bucket/key
        return `${endpoint.replace(/\/$/, '')}/${bucketName}/${key}`;
      }
      // AWS virtual-hosted-style
      return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    } catch (error: any) {
      const detail =
        error?.name === 'TimeoutError' || /timeout|ECONNREFUSED|ENOTFOUND|ETIMEDOUT/i.test(String(error?.message || ''))
          ? `Cannot reach S3 endpoint (${process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT || 'not set'}). Check network/VPN/firewall and bucket credentials.`
          : error.message;
      throw new InternalServerErrorException(`S3 upload failed: ${detail}`);
    }
  }
}
