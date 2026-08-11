import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProgramEligibilityDto } from './dto/create-program-eligibility.dto';
import { UpdateProgramEligibilityDto } from './dto/update-program-eligibility.dto';
import { ValidateProgramEligibilityDto } from './dto/validate-program-eligibility.dto';

@ApiTags('Master - Program Eligibility')
@Controller('master/program-eligibilities')
export class ProgramEligibilityController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a program eligibility rule (admin)' })
  @ApiResponse({ status: 201, description: 'Eligibility rule created' })
  create(@Body() dto: CreateProgramEligibilityDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_program_eligibility' }, dto);
  }

  @Post('validate')
  @ApiOperation({
    summary: 'Validate academic snapshot against compulsory eligibility rules',
  })
  @ApiResponse({ status: 200, description: '{ ok, errors[] }' })
  validate(@Body() dto: ValidateProgramEligibilityDto): Observable<any> {
    return this.studentClient.send({ cmd: 'validate_program_eligibility' }, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List eligibility rules (filter by programId / category)' })
  @ApiQuery({ name: 'programId', required: false, example: 5 })
  @ApiQuery({ name: 'ruleType', required: false, example: 'MIN_PERCENT' })
  @ApiQuery({ name: 'category', required: false, example: 'GEN' })
  @ApiQuery({ name: 'severity', required: false, example: 'Compulsory' })
  findAll(
    @Query('programId') programId?: string,
    @Query('ruleType') ruleType?: string,
    @Query('category') category?: string,
    @Query('severity') severity?: string,
  ): Observable<any> {
    const payload: {
      programId?: number;
      ruleType?: string;
      category?: string;
      severity?: string;
    } = {};
    if (programId?.trim()) payload.programId = Number(programId);
    if (ruleType?.trim()) payload.ruleType = ruleType;
    if (category?.trim()) payload.category = category;
    if (severity?.trim()) payload.severity = severity;
    return this.studentClient.send({ cmd: 'find_all_program_eligibilities' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get eligibility rule by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_program_eligibility' },
      { eligibilityId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update eligibility rule' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgramEligibilityDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_program_eligibility' },
      { eligibilityId: id, ...dto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete eligibility rule' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_program_eligibility' },
      { eligibilityId: id, DeletedBy, DeletedRemarks },
    );
  }
}
