import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateVideoGalleryDto } from './dto/create-video-gallery.dto';
import { UpdateVideoGalleryDto } from './dto/update-video-gallery.dto';

@ApiTags('Website - Video Galleries')
@Controller('website/video-galleries')
export class VideoGalleryController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new video gallery entry' })
  @ApiResponse({ status: 201, description: 'Video gallery entry created successfully' })
  create(@Body() createDto: CreateVideoGalleryDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_video_gallery' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active video galleries (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all video galleries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_video_galleries' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get video gallery details by videoGalleryId' })
  @ApiResponse({ status: 200, description: 'Return video gallery details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_video_gallery' }, { videoGalleryId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update video gallery details by videoGalleryId' })
  @ApiResponse({ status: 200, description: 'Video gallery updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateVideoGalleryDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_video_gallery' },
      { videoGalleryId: id, ...updateDto },
    );
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_video_gallery' },
      { videoGalleryId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a video gallery entry by videoGalleryId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete video' })
  @ApiResponse({ status: 200, description: 'Video gallery soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_video_gallery' },
      { videoGalleryId: id, DeletedBy, DeletedRemarks },
    );
  }
}
