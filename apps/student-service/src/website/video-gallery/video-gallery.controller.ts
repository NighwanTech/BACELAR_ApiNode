import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VideoGalleryService } from './video-gallery.service';

@Controller()
export class VideoGalleryController {
  constructor(private readonly videoGalleryService: VideoGalleryService) {}

  @MessagePattern({ cmd: 'create_video_gallery' })
  async create(@Payload() data: any) {
    try {
      return await this.videoGalleryService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_video_galleries' })
  async findAll() {
    try {
      return await this.videoGalleryService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_video_gallery' })
  async findOne(@Payload() data: { videoGalleryId: number }) {
    try {
      return await this.videoGalleryService.findOne(data.videoGalleryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_video_gallery' })
  async update(@Payload() data: any) {
    try {
      const { videoGalleryId, ...updateData } = data;
      return await this.videoGalleryService.update(videoGalleryId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_video_gallery' })
  async softDelete(
    @Payload() data: { videoGalleryId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.videoGalleryService.softDelete(
        data.videoGalleryId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
