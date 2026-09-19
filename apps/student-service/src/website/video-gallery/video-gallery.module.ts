import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { VideoGalleryController } from './video-gallery.controller';
import { VideoGalleryService } from './video-gallery.service';

@Module({
  imports: [PrismaModule],
  controllers: [VideoGalleryController],
  providers: [VideoGalleryService],
  exports: [VideoGalleryService],
})
export class VideoGalleryModule {}
