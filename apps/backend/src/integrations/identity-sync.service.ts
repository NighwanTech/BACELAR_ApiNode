import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { KohaClient } from './koha.client';
import { MoodleClient } from './moodle.client';

const CREATE_MAPPING = `
CREATE TABLE IF NOT EXISTS \`local_erp_identity_mapping\` (
  \`id\` INTEGER NOT NULL AUTO_INCREMENT,
  \`enrollmentNo\` VARCHAR(100) NOT NULL,
  \`registrationNo\` VARCHAR(100) NULL,
  \`moodleUserId\` INTEGER NULL,
  \`kohaPatronId\` INTEGER NULL,
  \`status\` VARCHAR(20) NOT NULL DEFAULT 'pending',
  \`lastSynced\` DATETIME(3) NULL,
  \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`updatedAt\` DATETIME(3) NULL,
  UNIQUE INDEX \`local_erp_identity_mapping_enrollmentNo_key\`(\`enrollmentNo\`),
  UNIQUE INDEX \`local_erp_identity_mapping_moodleUserId_key\`(\`moodleUserId\`),
  UNIQUE INDEX \`local_erp_identity_mapping_kohaPatronId_key\`(\`kohaPatronId\`),
  PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

@Injectable()
export class IdentitySyncService implements OnModuleInit {
  private readonly logger = new Logger(IdentitySyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly moodle: MoodleClient,
    private readonly koha: KohaClient,
  ) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_MAPPING);
  }

  async syncStudent(enrollmentNo: string) {
    const key = String(enrollmentNo || '').trim();
    if (!key) throw new NotFoundException('Enrollment number is required');
    const row = await (this.prisma as any).examLoginMaster.findFirst({
      where: { enrollmentNo: key, IsDeleted: false },
    });
    if (!row) throw new NotFoundException(`No exam login found for enrollment ${key}`);

    const active = row.IsActive !== false;
    const input = {
      enrollmentNo: key,
      studentName: row.studentName,
      email: row.emailId || null,
      active,
    };

    let moodle: { action: string; remoteId?: number; error?: string } = { action: 'failed' };
    let koha: { action: string; remoteId?: number; error?: string } = { action: 'failed' };

    try {
      const result = await this.moodle.upsert(input);
      moodle = { action: result.action, remoteId: result.remoteId };
    } catch (error: any) {
      moodle = { action: 'failed', error: error?.message || 'Moodle sync failed' };
      this.logger.warn(`Moodle sync failed enrollmentNo=${key} reason=${moodle.error}`);
    }

    try {
      const result = await this.koha.upsert(input);
      koha = { action: result.action, remoteId: result.remoteId };
    } catch (error: any) {
      koha = { action: 'failed', error: error?.message || 'Koha sync failed' };
      this.logger.warn(`Koha sync failed enrollmentNo=${key} reason=${koha.error}`);
    }

    const status = moodle.action !== 'failed' && koha.action !== 'failed' ? 'success' : moodle.action === 'failed' && koha.action === 'failed' ? 'failed' : 'partial';
    await this.saveMapping(key, row.registrationNo || null, moodle.remoteId || null, koha.remoteId || null, status);

    return { enrollmentNo: key, moodle: moodle.action, koha: koha.action, status, moodleUserId: moodle.remoteId || null, kohaPatronId: koha.remoteId || null };
  }

  private async saveMapping(enrollmentNo: string, registrationNo: string | null, moodleUserId: number | null, kohaPatronId: number | null, status: string) {
    await this.prisma.$executeRaw`
      INSERT INTO local_erp_identity_mapping (enrollmentNo, registrationNo, moodleUserId, kohaPatronId, status, lastSynced)
      VALUES (${enrollmentNo}, ${registrationNo}, ${moodleUserId}, ${kohaPatronId}, ${status}, CURRENT_TIMESTAMP(3))
      ON DUPLICATE KEY UPDATE
        registrationNo = VALUES(registrationNo),
        moodleUserId = COALESCE(VALUES(moodleUserId), moodleUserId),
        kohaPatronId = COALESCE(VALUES(kohaPatronId), kohaPatronId),
        status = VALUES(status),
        lastSynced = CURRENT_TIMESTAMP(3),
        updatedAt = CURRENT_TIMESTAMP(3)
    `;
  }
}
