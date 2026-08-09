import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ImageGalleryController } from './image-gallery.controller';
import { ImageGalleryService } from './image-gallery.service';

@Module({
  imports: [PrismaModule],
  controllers: [ImageGalleryController],
  providers: [ImageGalleryService],
  exports: [ImageGalleryService],
})
export class ImageGalleryModule {}
