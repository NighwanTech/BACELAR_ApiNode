import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { BulkDeleteFacultiesDto } from './dto/bulk-delete-faculties.dto';
import { CreateFacultyDocumentDto } from './dto/create-faculty-document.dto';
import { UploadFacultyDocumentDto } from './dto/upload-faculty-document.dto';
import { UploadFacultyProofDto } from './dto/upload-faculty-proof.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';
import { StorageService } from '../../shared/storage/storage.service';

@ApiTags('Master - Faculty')
@Controller('master/faculties')
export class FacultyController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Always prefer MinIO/S3 when STORAGE_PROVIDER=s3.
   * Do not silently fall back to local disk — that saved localhost /uploads URLs before.
   */
  private async storeFacultyFile(file: any, folder: string): Promise<string> {
    const provider = String(process.env.STORAGE_PROVIDER || 'local').trim().toLowerCase();
    if (provider === 's3') {
      return this.storageService.uploadFile(file, folder);
    }
    try {
      return await this.storageService.uploadFile(file, folder);
    } catch {
      return this.storageService.saveLocalFile(file, folder);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a faculty record (Employee ID is auto-generated 6-digit)' })
  @ApiResponse({ status: 201, description: 'Faculty created successfully' })
  create(@Body() createDto: CreateFacultyDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_faculty' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all faculty records (includes documents)' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_faculties' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete faculty records' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteFacultiesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_faculties' }, bulkDeleteDto);
  }

  @Post(':id/documents/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload faculty document (image or PDF) and save facultyDocument row' })
  uploadDocument(
    @Param('id', ParseIntPipe) facultyId: number,
    @Body() body: UploadFacultyDocumentDto,
    @UploadedFile() file: any,
  ): Observable<any> {
    if (!file) {
      throw new BadRequestException('File is required. Send multipart/form-data with field name "file".');
    }
    const documentType = String(body.documentType || '').trim().toUpperCase();
    const folder = `faculty/${documentType.toLowerCase()}`;

    return from(this.storeFacultyFile(file, folder)).pipe(
      switchMap((fileUrl) => {
        const createDto: CreateFacultyDocumentDto = {
          facultyId,
          documentType,
          fileUrl,
          fileName: body.fileName || file.originalname,
          CreatedBy: body.CreatedBy,
          Remarks: body.Remarks,
        };
        return this.studentClient.send({ cmd: 'create_faculty_document' }, createDto);
      }),
    );
  }

  @Post(':id/documents')
  @ApiOperation({ summary: 'Register an already uploaded faculty document URL' })
  createDocument(
    @Param('id', ParseIntPipe) facultyId: number,
    @Body() createDto: CreateFacultyDocumentDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'create_faculty_document' },
      { ...createDto, facultyId },
    );
  }

  @Get(':id/documents')
  @ApiOperation({ summary: 'List documents for a faculty' })
  findDocuments(@Param('id', ParseIntPipe) facultyId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_faculty_documents' }, { facultyId });
  }

  @Delete(':id/documents/:documentId')
  @ApiOperation({ summary: 'Soft delete a faculty document' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  removeDocument(
    @Param('documentId', ParseIntPipe) documentId: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_faculty_document' },
      { facultyDocumentId: documentId, DeletedBy, DeletedRemarks },
    );
  }

  @Post(':id/educations/:educationId/certificate')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload degree / marksheet proof for one education row' })
  uploadEducationCertificate(
    @Param('id', ParseIntPipe) facultyId: number,
    @Param('educationId', ParseIntPipe) educationId: number,
    @Body() body: UploadFacultyProofDto,
    @UploadedFile() file: any,
  ): Observable<any> {
    if (!file) {
      throw new BadRequestException('File is required. Send multipart/form-data with field name "file".');
    }
    return from(this.storeFacultyFile(file, 'faculty/education')).pipe(
      switchMap((fileUrl) =>
        this.studentClient.send(
          { cmd: 'upload_faculty_education_certificate' },
          {
            facultyId,
            facultyEducationId: educationId,
            fileUrl,
            fileName: body.fileName || file.originalname,
            UpdatedBy: body.UpdatedBy,
          },
        ),
      ),
    );
  }

  @Post(':id/experiences/:experienceId/letter')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload experience letter for one experience row' })
  uploadExperienceLetter(
    @Param('id', ParseIntPipe) facultyId: number,
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @Body() body: UploadFacultyProofDto,
    @UploadedFile() file: any,
  ): Observable<any> {
    if (!file) {
      throw new BadRequestException('File is required. Send multipart/form-data with field name "file".');
    }
    return from(this.storeFacultyFile(file, 'faculty/experience')).pipe(
      switchMap((fileUrl) =>
        this.studentClient.send(
          { cmd: 'upload_faculty_experience_letter' },
          {
            facultyId,
            facultyExperienceId: experienceId,
            fileUrl,
            fileName: body.fileName || file.originalname,
            UpdatedBy: body.UpdatedBy,
          },
        ),
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get faculty by facultyId (includes documents, education and experience)' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_faculty' }, { facultyId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update faculty details' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFacultyDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_faculty' }, { facultyId: id, ...updateDto });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_faculty' },
      { facultyId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete faculty (also soft-deletes documents)' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_faculty' },
      { facultyId: id, DeletedBy, DeletedRemarks },
    );
  }
}
