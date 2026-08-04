import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { generateId } from '@universityos/common';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
private client!: Minio.Client;
  private bucket!: string;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.bucket = this.config.get<string>('MINIO_BUCKET', 'universityos-documents');
    this.client = new Minio.Client({
      endPoint: this.config.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: this.config.get<number>('MINIO_PORT', 9000),
      useSSL: this.config.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.config.get<string>('MINIO_ACCESS_KEY', 'universityos'),
      secretKey: this.config.get<string>('MINIO_SECRET_KEY', 'change_me'),
    });
    this.ensureBucket();
  }

  private async ensureBucket() {
    try {
      const exists = await this.client.bucketExists(this.bucket);
      if (!exists) {
        await this.client.makeBucket(this.bucket);
      }
    } catch (err) {
      this.logger.error(`MinIO bucket init failed: ${(err as Error).message}`);
    }
  }

  async upload(
    buffer: Buffer,
    objectName: string,
    mimeType: string,
    tenantId: string,
  ): Promise<string> {
    const key = `${tenantId}/${Date.now()}-${generateId()}-${objectName}`;
    await this.client.putObject(this.bucket, key, buffer, buffer.length, {
      'Content-Type': mimeType,
    });
    return key;
  }

  async download(objectName: string): Promise<Buffer> {
    const stream = await this.client.getObject(this.bucket, objectName);
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }
    return Buffer.concat(chunks);
  }

  async delete(objectName: string): Promise<void> {
    await this.client.removeObject(this.bucket, objectName);
  }

  async getPresignedUrl(objectName: string, expiresIn = 3600): Promise<string> {
    return this.client.presignedGetObject(this.bucket, objectName, expiresIn);
  }

  async getUploadUrl(objectName: string, expiresIn = 3600): Promise<string> {
    return this.client.presignedPutObject(this.bucket, objectName, expiresIn);
  }

  async stat(objectName: string) {
    return this.client.statObject(this.bucket, objectName);
  }
}
