import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { StorageService } from './storage.service';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('object/*')
  @ApiOperation({
    summary: 'Stream a private S3 (or local) object through the API',
  })
  async getObject(@Req() req: Request, @Res() res: Response) {
    // Nest/Express wildcard: params[0] = everything after /object/
    const raw = (req.params as Record<string, string>)[0] || '';
    const key = decodeURIComponent(raw).replace(/^\/+/, '');
    if (!key || key.includes('..')) {
      throw new BadRequestException('Invalid object key');
    }

    try {
      const { body, contentType, contentLength } =
        await this.storageService.getObject(key);

      res.setHeader('Content-Type', contentType || 'application/octet-stream');
      if (contentLength != null) {
        res.setHeader('Content-Length', String(contentLength));
      }
      res.setHeader('Cache-Control', 'public, max-age=86400');

      if (Buffer.isBuffer(body)) {
        return res.send(body);
      }

      (body as NodeJS.ReadableStream).pipe(res);
    } catch (error: any) {
      if (
        error?.name === 'NoSuchKey' ||
        error?.$metadata?.httpStatusCode === 404 ||
        error?.status === 404
      ) {
        throw new NotFoundException(`Object not found: ${key}`);
      }
      throw error;
    }
  }
}
