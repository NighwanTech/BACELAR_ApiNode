import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { ErrorLogService } from './error-log.service';

class UpdateErrorLogStatusDto {
  @IsIn(['Open', 'Resolved'])
  ErrorStatus: 'Open' | 'Resolved';
}

@ApiTags('Error Log')
@Controller('error-logs')
export class ErrorLogController {
  constructor(private readonly errorLog: ErrorLogService) {}

  @Get()
  @ApiOperation({ summary: 'List admin and website error logs' })
  @ApiQuery({ name: 'source', required: false, example: 'Admin' })
  @ApiQuery({ name: 'status', required: false, example: 'Open' })
  findAll(@Query('source') source?: string, @Query('status') status?: string) {
    return this.errorLog.findAll(cleanFilter(source), cleanFilter(status));
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Mark an error log Open or Resolved' })
  async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateErrorLogStatusDto) {
    const row = await this.errorLog.updateStatus(id, body.ErrorStatus);
    if (!row) throw new NotFoundException('Error log not found');
    return row;
  }
}

function cleanFilter(value?: string) {
  const text = String(value || '').trim();
  return text && text !== 'ALL' ? text : undefined;
}
