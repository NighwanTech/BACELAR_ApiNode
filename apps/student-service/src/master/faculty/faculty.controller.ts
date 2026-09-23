import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FacultyService } from './faculty.service';

@Controller()
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @MessagePattern({ cmd: 'create_faculty' })
  async create(@Payload() data: any) {
    try {
      return await this.facultyService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_faculties' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.facultyService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_faculty' })
  async findOne(@Payload() data: { facultyId: number }) {
    try {
      return await this.facultyService.findOne(data.facultyId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_faculty' })
  async update(@Payload() data: any) {
    try {
      const { facultyId, ...updateData } = data;
      return await this.facultyService.update(facultyId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_faculty' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.facultyService.updateStatus(data.facultyId, data.IsActive, data.UpdatedBy);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_faculty' })
  async softDelete(
    @Payload() data: { facultyId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultyService.softDelete(data.facultyId, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_faculties' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultyService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_faculty_documents' })
  async findDocuments(@Payload() data: { facultyId: number }) {
    try {
      return await this.facultyService.findDocuments(data.facultyId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'create_faculty_document' })
  async createDocument(@Payload() data: any) {
    try {
      return await this.facultyService.createDocument(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'upload_faculty_education_certificate' })
  async uploadEducationCertificate(@Payload() data: any) {
    try {
      return await this.facultyService.uploadEducationCertificate(
        Number(data.facultyId),
        Number(data.facultyEducationId),
        data.fileUrl,
        data.fileName,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'upload_faculty_experience_letter' })
  async uploadExperienceLetter(@Payload() data: any) {
    try {
      return await this.facultyService.uploadExperienceLetter(
        Number(data.facultyId),
        Number(data.facultyExperienceId),
        data.fileUrl,
        data.fileName,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_faculty_document' })
  async softDeleteDocument(
    @Payload() data: { facultyDocumentId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultyService.softDeleteDocument(
        data.facultyDocumentId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
