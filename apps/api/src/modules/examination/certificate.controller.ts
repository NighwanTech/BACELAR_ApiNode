import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CertificateService } from './certificate.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.certificateService.create(tenantId, dto);
    return success(data, 'Certificate created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('studentId') studentId?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.certificateService.findAll(tenantId, {
      page,
      limit,
      studentId,
      type,
      status,
    });
    return paginated(data, 'Certificates retrieved');
  }

  @Get('verify/:qrCode')
  async verify(@Param('qrCode') qrCode: string) {
    const data = await this.certificateService.verify(qrCode);
    return success(data, 'Certificate verification result');
  }

  @Get('issue-number/:issueNumber')
  async findByIssueNumber(@Tenant('id') tenantId: string, @Param('issueNumber') issueNumber: string) {
    const data = await this.certificateService.findByIssueNumber(tenantId, issueNumber);
    return success(data, 'Certificate retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.certificateService.findById(tenantId, id);
    return success(data, 'Certificate retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.certificateService.update(tenantId, id, dto);
    return success(data, 'Certificate updated successfully');
  }

  @Post(':id/issue')
  async issue(@Tenant('id') tenantId: string, @Param('id') id: string, @CurrentUser('id') userId: string) {
    const data = await this.certificateService.issue(tenantId, id, userId);
    return success(data, 'Certificate issued successfully');
  }

  @Post(':id/revoke')
  async revoke(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.certificateService.revoke(tenantId, id);
    return success(data, 'Certificate revoked successfully');
  }
}
