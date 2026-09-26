import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { CourseSyncService } from './course-sync.service';
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
    private readonly courses: CourseSyncService,
  ) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_MAPPING);
    const minutes = Number(process.env.IDENTITY_SYNC_INTERVAL_MINUTES || 0);
    if (minutes > 0) {
      setInterval(() => {
        this.syncPending(10).catch((error: any) => {
          this.logger.warn(`Pending identity sync failed reason=${error?.message || 'unknown'}`);
        });
      }, minutes * 60 * 1000);
    }
  }

  async syncStudent(enrollmentNo: string) {
    const key = String(enrollmentNo || '').trim();
    if (!key) throw new NotFoundException('Enrollment number is required');
    const row = await this.loadIdentity(key);
    if (!row) throw new NotFoundException(`No enrollment found for ${key}`);

    const active = row.active;
    const input = {
      enrollmentNo: key,
      studentName: row.studentName,
      email: row.email,
      active,
      password: row.password,
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
    await this.saveMapping(key, row.registrationNo, moodle.remoteId || null, koha.remoteId || null, status);

    let courses: any = null;
    if (moodle.remoteId) {
      courses = await this.courses.syncForEnrollment({
        enrollmentNo: key,
        moodleUserId: moodle.remoteId,
        active,
      }).catch((error: any) => ({ created: 0, updated: 0, enrolled: 0, removed: 0, failed: 1, error: error?.message || 'Course sync failed' }));
    }

    return { enrollmentNo: key, moodle: moodle.action, koha: koha.action, status, moodleUserId: moodle.remoteId || null, kohaPatronId: koha.remoteId || null, courses };
  }

  async status(enrollmentNo: string) {
    const key = String(enrollmentNo || '').trim();
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT enrollmentNo, moodleUserId, kohaPatronId, status, lastSynced
      FROM local_erp_identity_mapping
      WHERE enrollmentNo = ${key}
      LIMIT 1
    `;
    const row = rows?.[0];
    if (!row) return { enrollmentNo: key, status: 'not_synced', moodleUserId: null, kohaPatronId: null };
    return row;
  }

  async syncPending(limit = 10) {
    const cap = Math.min(Math.max(Number(limit) || 10, 1), 20);
    const rows = await this.prisma.$queryRawUnsafe<any[]>(
      `SELECT e.enrollmentNo
       FROM studentEnrollment e
       LEFT JOIN local_erp_identity_mapping m ON m.enrollmentNo = e.enrollmentNo
       WHERE e.IsDeleted = 0
         AND e.enrollmentNo IS NOT NULL
         AND e.enrollmentNo <> ''
         AND (m.enrollmentNo IS NULL OR m.status <> 'success')
       ORDER BY e.CreatedOn DESC
       LIMIT ${cap}`,
    );
    const results = [];
    for (const row of rows || []) {
      results.push(await this.syncStudent(String(row.enrollmentNo)));
    }
    return { processed: results.length, results };
  }

  private async loadIdentity(enrollmentNo: string) {
    const exam = await (this.prisma as any).examLoginMaster.findFirst({
      where: { enrollmentNo, IsDeleted: false },
    });
    if (exam?.enrollmentNo) {
      return {
        studentName: exam.studentName || null,
        email: exam.emailId || null,
        active: exam.IsActive !== false,
        registrationNo: exam.registrationNo || null,
        password: exam.plainPassword || null,
      };
    }

    const enrollment = await (this.prisma as any).studentEnrollment.findFirst({
      where: { enrollmentNo, IsDeleted: false },
      orderBy: { CreatedOn: 'desc' },
    });
    if (!enrollment?.enrollmentNo) return null;
    return {
      studentName: enrollment.studentName || null,
      email: enrollment.emailId || null,
      active: enrollment.IsActive !== false,
      registrationNo: enrollment.registrationNo || null,
      password: enrollment.examPassword || null,
    };
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
