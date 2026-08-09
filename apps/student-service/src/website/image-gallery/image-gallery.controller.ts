import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ImageGalleryService } from './image-gallery.service';

@Controller()
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {}

  @MessagePattern({ cmd: 'create_image_gallery' })
  async create(@Payload() data: any) {
    try {
      return await this.imageGalleryService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_image_galleries' })
  async findAll() {
    try {
      return await this.imageGalleryService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_image_gallery' })
  async findOne(@Payload() data: { imageGalleryId: number }) {
    try {
      return await this.imageGalleryService.findOne(data.imageGalleryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_image_gallery' })
  async update(@Payload() data: any) {
    try {
      const { imageGalleryId, ...updateData } = data;
      return await this.imageGalleryService.update(imageGalleryId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_image_gallery' })
  async softDelete(
    @Payload() data: { imageGalleryId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.imageGalleryService.softDelete(
        data.imageGalleryId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
