import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @UploadedFile() file: any,
    @Body() dto: UploadDocumentDto,
  ) {
    const data = await this.documentService.upload(tenantId, userId, file, dto);
    return success(data, 'Document uploaded successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.documentService.findAll(tenantId, {
      page,
      limit,
      category,
      status,
      search,
    });
    return paginated(data, 'Documents retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.documentService.findById(tenantId, id);
    return success(data, 'Document retrieved');
  }

  @Get(':id/signed-url')
  async getSignedUrl(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.documentService.getSignedUrl(tenantId, id);
    return success(data, 'Signed URL generated');
  }

  @Post(':id/approvals')
  async addApproval(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('approverId') approverId: string,
    @Body('sequence') sequence: number,
  ) {
    const data = await this.documentService.addApproval(tenantId, id, approverId, sequence);
    return success(data, 'Approval added successfully');
  }

  @Patch('approvals/:approvalId/approve')
  async approve(
    @Tenant('id') tenantId: string,
    @Param('approvalId') approvalId: string,
    @Body('documentId') documentId: string,
    @CurrentUser('id') userId: string,
    @Body('comment') comment?: string,
  ) {
    const data = await this.documentService.approve(tenantId, documentId, approvalId, userId, comment);
    return success(data, 'Document approved successfully');
  }

  @Patch('approvals/:approvalId/reject')
  async reject(
    @Tenant('id') tenantId: string,
    @Param('approvalId') approvalId: string,
    @Body('documentId') documentId: string,
    @Body('comment') comment: string,
  ) {
    const data = await this.documentService.reject(tenantId, documentId, approvalId, comment);
    return success(data, 'Document rejected');
  }

  @Delete(':id')
  async delete(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.documentService.delete(tenantId, id);
    return success(data, 'Document deleted successfully');
  }
}
