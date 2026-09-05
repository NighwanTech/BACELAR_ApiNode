import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BulkDeleteRolesDto } from './dto/bulk-delete-roles.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Roles')
@Controller('master/roles')
export class RoleController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  create(@Body() createDto: CreateRoleDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_role' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active roles' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_roles' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by roleId' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_role' }, { roleId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRoleDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_role' }, { roleId: id, ...updateDto });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update role active/inactive status' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_status_role' }, { roleId: id, ...statusDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete role' })
  @ApiQuery({ name: 'DeletedBy', required: true })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_role' },
      { roleId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete roles' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteRolesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_roles' }, bulkDeleteDto);
  }
}
