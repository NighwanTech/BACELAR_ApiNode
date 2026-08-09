import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
  private readonly storageProvider = process.env.STORAGE_PROVIDER || 'local';

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

  /**
   * AWS S3 / Hostinger Object Storage upload stub.
   * Can be configured by adding `@aws-sdk/client-s3` later without changing controllers.
   */
  private async uploadToS3(file: any, folder: string): Promise<string> {
    // Reading credentials from env
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const s3Endpoint = process.env.AWS_ENDPOINT; // For custom providers like Hostinger Object Storage

    if (!bucketName) {
      throw new InternalServerErrorException('AWS S3 bucket name is not configured in .env');
    }

    try {
      console.log(`[S3 Storage] Simulating file upload to bucket "${bucketName}"...`);
      // Here you would initialize S3 client:
      // const s3 = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region, endpoint: s3Endpoint });
      // await s3.send(new PutObjectCommand({ Bucket: bucketName, Key: `${folder}/${file.originalname}`, Body: file.buffer }));

      // Placeholder return simulating cloud URL
      const host = s3Endpoint || `https://${bucketName}.s3.${region}.amazonaws.com`;
      const cleanHost = host.replace(/\/$/, '');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      
      return folder 
        ? `${cleanHost}/${folder}/${uniqueSuffix}${ext}`
        : `${cleanHost}/${uniqueSuffix}${ext}`;
    } catch (error: any) {
      throw new InternalServerErrorException(`S3 upload failed: ${error.message}`);
    }
  }
}
