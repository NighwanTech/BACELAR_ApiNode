import { Controller, Param, Post } from '@nestjs/common';
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
}
