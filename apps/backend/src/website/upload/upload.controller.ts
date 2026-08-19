import { Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from '../../shared/storage/storage.service';

@ApiTags('Website - File Upload')
@Controller('website/upload')
export class UploadController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
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
    const relativePath = await this.storageService.uploadFile(file, subfolder);

    const port = process.env.PORT || '5000';
    const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
    const fullUrl = relativePath.startsWith('http')
      ? relativePath
      : `${baseUrl.replace(/\/+$/, '')}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;

    return {
      success: true,
      url: fullUrl,
      relativePath,
      filename: file.originalname,
    };
  }
}
