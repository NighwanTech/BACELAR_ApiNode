import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePramanDetailsDto } from './dto/create-praman-details.dto';
import { UpdatePramanDetailsDto } from './dto/update-praman-details.dto';
import { BulkDeletePramanDetailsDto } from './dto/bulk-delete-praman-details.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';
import { StorageService } from '../../shared/storage/storage.service';

@ApiTags('Website - Praman Details')
@Controller('website/praman-details')
export class PramanDetailsController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
    private readonly storageService: StorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB max limit for Images, PDFs, Excel, Word docs
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload attachment file (Image, PDF, Excel, Word Doc) to MinIO/S3' })
  @ApiQuery({ name: 'folder', required: false, example: 'praman-details', description: 'Subfolder / S3 key prefix' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Attachment file to upload (Image, PDF, Excel, Doc)',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Attachment file uploaded successfully to MinIO/S3' })
  async uploadFile(
    @UploadedFile() file: any,
    @Query('folder') folder: string = 'praman-details',
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded. Attach file under key "file".');
    }

    const subfolder = folder || 'praman-details';
    const storedPath = await this.storageService.uploadFile(file, subfolder);

    return {
      success: true,
      url: storedPath,
      relativePath: storedPath,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new praman details entry' })
  @ApiResponse({ status: 201, description: 'Praman details entry created successfully' })
  create(@Body() createDto: CreatePramanDetailsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_praman_details' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active praman details (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all praman details entries' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  @ApiQuery({ name: 'pramanId', required: false, example: 1, description: 'Filter by pramanId' })
  @ApiQuery({ name: 'subParameterId', required: false, example: 1, description: 'Filter by subParameterId' })
  @ApiQuery({ name: 'academicYearId', required: false, example: 1, description: 'Filter by academicYearId' })
  @ApiQuery({ name: 'monthId', required: false, example: 4, description: 'Filter by monthId' })
  @ApiQuery({ name: 'pramanResId', required: false, example: 1, description: 'Filter by pramanResId' })
  findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('pramanId') pramanId?: string,
    @Query('subParameterId') subParameterId?: string,
    @Query('academicYearId') academicYearId?: string,
    @Query('monthId') monthId?: string,
    @Query('pramanResId') pramanResId?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_praman_details' },
      {
        activeOnly: parseActiveOnlyFlag(activeOnly),
        pramanId: pramanId ? parseInt(pramanId, 10) : undefined,
        subParameterId: subParameterId ? parseInt(subParameterId, 10) : undefined,
        academicYearId: academicYearId ? parseInt(academicYearId, 10) : undefined,
        monthId: monthId ? parseInt(monthId, 10) : undefined,
        pramanResId: pramanResId ? parseInt(pramanResId, 10) : undefined,
      },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get praman details by pramanDetailsId' })
  @ApiResponse({ status: 200, description: 'Return praman details entry' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_praman_details' },
      { pramanDetailsId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update praman details by pramanDetailsId' })
  @ApiResponse({ status: 200, description: 'Praman details entry updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePramanDetailsDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_praman_details' },
      { pramanDetailsId: id, ...updateDto },
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
      { cmd: 'update_status_praman_details' },
      { pramanDetailsId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a praman details entry by pramanDetailsId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete entry' })
  @ApiResponse({ status: 200, description: 'Praman details entry soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_praman_details' },
      { pramanDetailsId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple praman details entries' })
  @ApiResponse({ status: 200, description: 'Praman details entries bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeletePramanDetailsDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'bulk_delete_praman_details' },
      bulkDeleteDto,
    );
  }
}
