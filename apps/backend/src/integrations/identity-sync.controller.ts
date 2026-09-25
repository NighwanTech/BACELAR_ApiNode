import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IdentitySyncService } from './identity-sync.service';

@ApiTags('Integrations')
@Controller('integrations/sync')
export class IdentitySyncController {
  constructor(private readonly sync: IdentitySyncService) {}

  @Post('student/:enrollmentNo')
  @ApiOperation({ summary: 'Sync one exam-login enrollment number to Moodle and Koha' })
  syncStudent(@Param('enrollmentNo') enrollmentNo: string) {
    return this.sync.syncStudent(enrollmentNo);
  }

  @Get('student/:enrollmentNo')
  @ApiOperation({ summary: 'Read Moodle and Koha sync status for one enrollment number' })
  status(@Param('enrollmentNo') enrollmentNo: string) {
    return this.sync.status(enrollmentNo);
  }

  @Post('pending')
  @ApiOperation({ summary: 'Sync up to 20 enrollments that are missing or not successful' })
  syncPending() {
    return this.sync.syncPending(10);
  }
}
