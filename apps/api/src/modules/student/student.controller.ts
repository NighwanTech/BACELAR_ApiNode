import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any,
  ) {
    const data = await this.studentService.create(tenantId, dto, userId);
    return success(data, 'Student created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('programId') programId?: string,
    @Query('batchId') batchId?: string,
    @Query('status') status?: string,
    @Query('category') category?: string,
  ) {
    const data = await this.studentService.findAll(tenantId, {
      page,
      limit,
      search,
      programId,
      batchId,
      status,
      category,
    });
    return paginated(data, 'Students retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.studentService.findById(tenantId, id);
    return success(data, 'Student retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.studentService.update(tenantId, id, dto);
    return success(data, 'Student updated successfully');
  }

  @Post(':id/guardians')
  async addGuardian(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.studentService.addGuardian(tenantId, id, dto);
    return success(data, 'Guardian added successfully');
  }

  @Post(':id/education-history')
  async addEducationHistory(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.studentService.addEducationHistory(tenantId, id, dto);
    return success(data, 'Education history added successfully');
  }

  @Patch(':id/status')
  async changeStatus(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const data = await this.studentService.changeStatus(tenantId, id, status);
    return success(data, 'Student status updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.studentService.remove(tenantId, id);
    return success(data, 'Student removed successfully');
  }
}
