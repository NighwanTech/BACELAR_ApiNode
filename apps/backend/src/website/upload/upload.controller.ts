import { Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from '../../shared/storage/storage.service';

@ApiTags('Website - File Upload')
@Controller('website/upload')
export class UploadController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file to storage (S3 or local via StorageService)' })
  @ApiQuery({ name: 'folder', required: false, example: 'hero', description: 'Subfolder / S3 key prefix' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The file to upload',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async upload(
    @UploadedFile() file: any,
    @Query('folder') folder: string = 'hero',
  ) {
    if (!file) {
      return { success: false, message: 'No file uploaded' };
    }

    const subfolder = folder || 'hero';
    // StorageService returns:
    // - S3/MinIO: full public URL (https://s3.../bucket/key)
    // - local: relative path (/uploads/...)
    const storedPath = await this.storageService.uploadFile(file, subfolder);
    const url = this.toClientUrl(storedPath);

    return {
      success: true,
      url,
      relativePath: storedPath,
      filename: file.originalname,
    };
  }

  /**
   * Never rewrite MinIO/S3 https URLs to localhost.
   * Only prefix localhost for local-disk relative /uploads paths.
   */
  private toClientUrl(storedPath: string): string {
    if (/^https?:\/\//i.test(storedPath)) {
      return storedPath;
    }

    // API proxy path → MinIO public URL
    const proxyPrefix = '/api/v1/storage/object/';
    if (storedPath.startsWith(proxyPrefix)) {
      const key = storedPath.slice(proxyPrefix.length);
      const bucket =
        process.env.S3_BUCKET || process.env.AWS_BUCKET_NAME || '';
      const publicBase =
        (process.env.S3_PUBLIC_URL || '').replace(/\/$/, '') ||
        (process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT
          ? `${(process.env.S3_ENDPOINT || process.env.AWS_ENDPOINT || '').replace(/\/$/, '')}/${bucket}`
          : '');
      if (publicBase) {
        return `${publicBase}/${key}`;
      }
    }

    // Local disk only
    const port = process.env.PORT || '5001';
    const baseUrl = (process.env.BASE_URL || `http://localhost:${port}`).replace(/\/+$/, '');
    return `${baseUrl}${storedPath.startsWith('/') ? '' : '/'}${storedPath}`;
  }
}
