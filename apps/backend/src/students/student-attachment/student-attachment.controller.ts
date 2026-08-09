import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateStudentAttachmentDto } from './dto/create-student-attachment.dto';
import { UpdateStudentAttachmentDto } from './dto/update-student-attachment.dto';
import { BulkDeleteStudentAttachmentsDto } from './dto/bulk-delete-student-attachments.dto';
import { UploadStudentAttachmentDto } from './dto/upload-student-attachment.dto';
import { StorageService } from '../../shared/storage/storage.service';

@ApiTags('Student - Attachments')
@Controller('students-attachments')
export class StudentAttachmentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
    private readonly storageService: StorageService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file (Photo/Signature) and save attachment record' })
  @ApiResponse({ status: 201, description: 'File uploaded and registered successfully' })
  upload(
    @Body() body: UploadStudentAttachmentDto,
    @UploadedFile() file: any,
  ): Observable<any> {
    const folder = body.documentType.toLowerCase();

    // 1. Upload file dynamically using decoupled StorageService (Local or S3 depending on env)
    return from(this.storageService.uploadFile(file, folder)).pipe(
      // 2. Save metadata in DB via Microservice
      switchMap((fileUrl) => {
        const createDto: CreateStudentAttachmentDto = {
          studentId: Number(body.studentId),
          documentType: body.documentType,
          fileUrl: fileUrl,
          CreatedBy: body.CreatedBy,
          Remarks: body.Remarks,
        };
        return this.studentClient.send({ cmd: 'create_student_attachment' }, createDto);
      }),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Register an already uploaded attachment file record' })
  @ApiResponse({ status: 201, description: 'Attachment record registered successfully' })
  create(@Body() createDto: CreateStudentAttachmentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_student_attachment' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all student attachment records' })
  @ApiResponse({ status: 200, description: 'Return all attachments' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_student_attachments' }, {});
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all attachment records for a specific Student Registration ID' })
  @ApiResponse({ status: 200, description: 'Return student attachments' })
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_student_attachments_by_student' }, { studentId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attachment details by ID' })
  @ApiResponse({ status: 200, description: 'Return attachment details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_student_attachment' }, { attachmentId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attachment record path or type' })
  @ApiResponse({ status: 200, description: 'Attachment record updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateStudentAttachmentDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_student_attachment' }, { attachmentId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete attachment record by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete document' })
  @ApiResponse({ status: 200, description: 'Attachment record soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_student_attachment' },
      { attachmentId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple attachment records' })
  @ApiResponse({ status: 200, description: 'Attachment records bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteStudentAttachmentsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_student_attachments' }, bulkDeleteDto);
  }
}
