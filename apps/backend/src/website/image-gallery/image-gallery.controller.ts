import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';

@ApiTags('Website - Image Galleries')
@Controller('website/image-galleries')
export class ImageGalleryController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new image gallery entry / album' })
  @ApiResponse({ status: 201, description: 'Image gallery created successfully' })
  create(@Body() createDto: CreateImageGalleryDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_image_gallery' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active image galleries (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all image galleries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_image_galleries' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get image gallery details by imageGalleryId' })
  @ApiResponse({ status: 200, description: 'Return image gallery details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_image_gallery' }, { imageGalleryId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update image gallery details by imageGalleryId' })
  @ApiResponse({ status: 200, description: 'Image gallery updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateImageGalleryDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_image_gallery' },
      { imageGalleryId: id, ...updateDto },
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
      { cmd: 'update_status_image_gallery' },
      { imageGalleryId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an image gallery entry by imageGalleryId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete album' })
  @ApiResponse({ status: 200, description: 'Image gallery soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_image_gallery' },
      { imageGalleryId: id, DeletedBy, DeletedRemarks },
    );
  }
}
