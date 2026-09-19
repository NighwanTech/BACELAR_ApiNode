import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAdminLoginDto } from './dto/create-admin-login.dto';
import { UpdateAdminLoginDto } from './dto/update-admin-login.dto';
import { BulkDeleteAdminLoginsDto } from './dto/bulk-delete-admin-logins.dto';
import { AdminLoginAuthDto } from './dto/admin-login-auth.dto';
import { ChangeAdminPasswordDto } from './dto/change-admin-password.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Admin - Login')
@Controller('admin/logins')
export class AdminLoginController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login with EmailId or LoginName + password' })
  @ApiResponse({ status: 200, description: 'Returns JWT token and admin profile' })
  login(@Body() loginDto: AdminLoginAuthDto): Observable<any> {
    return this.studentClient.send({ cmd: 'login_admin' }, loginDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create admin login user' })
  create(@Body() createDto: CreateAdminLoginDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_admin_login' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admin login users' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_admin_logins' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin login by LoginId' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_admin_login' }, { LoginId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admin login user' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAdminLoginDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_admin_login' }, { LoginId: id, ...updateDto });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update admin login active/inactive status' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_admin_login' },
      { LoginId: id, ...statusDto, ModifyBy: statusDto.UpdatedBy },
    );
  }

  @Patch(':id/change-password')
  @ApiOperation({ summary: 'Change admin password (requires current password)' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeAdminPasswordDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'change_password_admin_login' },
      { LoginId: id, ...dto },
    );
  }

  @Patch(':id/profile')
  @ApiOperation({ summary: 'Update admin profile (name / profile photo)' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdminProfileDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_profile_admin_login' },
      { LoginId: id, ...dto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete admin login user' })
  @ApiQuery({ name: 'DeletedBy', required: true })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_admin_login' },
      { LoginId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete admin login users' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAdminLoginsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_admin_logins' }, bulkDeleteDto);
  }
}
