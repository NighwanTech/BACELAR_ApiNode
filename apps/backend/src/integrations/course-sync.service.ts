import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { MoodleClient } from './moodle.client';

const CREATE_COURSE_MAP = `
CREATE TABLE IF NOT EXISTS \`local_erp_course_mapping\` (
  \`id\` INTEGER NOT NULL AUTO_INCREMENT,
  \`paperId\` INTEGER NOT NULL,
  \`programId\` INTEGER NULL,
  \`shortname\` VARCHAR(100) NOT NULL,
  \`moodleCategoryId\` INTEGER NULL,
  \`moodleCourseId\` INTEGER NULL,
  \`status\` VARCHAR(20) NOT NULL DEFAULT 'pending',
  \`lastSynced\` DATETIME(3) NULL,
  UNIQUE INDEX \`local_erp_course_mapping_paperId_key\`(\`paperId\`),
  UNIQUE INDEX \`local_erp_course_mapping_shortname_key\`(\`shortname\`),
  PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

@Injectable()
export class CourseSyncService implements OnModuleInit {
  private readonly logger = new Logger(CourseSyncService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly moodle: MoodleClient,
  ) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_COURSE_MAP);
  }

  async syncForEnrollment(input: { enrollmentNo: string; moodleUserId: number; active: boolean }) {
    const enrollment = await (this.prisma as any).studentEnrollment.findFirst({
      where: { enrollmentNo: input.enrollmentNo, IsDeleted: false },
      orderBy: { CreatedOn: 'desc' },
    });
    if (!enrollment?.programId) {
      return { created: 0, updated: 0, enrolled: 0, removed: 0, failed: 0, error: 'Enrollment has no program' };
    }
    const program = await (this.prisma as any).program.findFirst({
      where: { programId: enrollment.programId, IsDeleted: false },
    });
    if (!program) {
      return { created: 0, updated: 0, enrolled: 0, removed: 0, failed: 0, error: 'Program not found' };
    }

    const papers = await this.papersFor(enrollment);
    const summary = { created: 0, updated: 0, enrolled: 0, removed: 0, failed: 0, error: '' };
    if (!papers.length) {
      summary.error = 'No papers for this program';
      return summary;
    }

    let categoryId = 0;
    try {
      const code = String(program.programCode || program.programShortName || `P${program.programId}`).slice(0, 100);
      categoryId = await this.moodle.upsertCategory(String(program.programName || code).slice(0, 100), code);
    } catch (error: any) {
      summary.error = error?.message || 'Moodle category failed';
      summary.failed = papers.length;
      this.logger.warn(`Course category failed enrollmentNo=${input.enrollmentNo} reason=${summary.error}`);
      return summary;
    }

    for (const paper of papers) {
      const code = String(paper.paperCode || 'PAPER').replace(/\s+/g, '').slice(0, 70);
      const shortname = `${code}-${paper.paperId}`.slice(0, 100);
      const fullname = String(paper.paperName || shortname).slice(0, 254);
      try {
        const course = await this.moodle.upsertCourse({ shortname, fullname, categoryId });
        if (course.action === 'created') summary.created += 1;
        else summary.updated += 1;
        await this.saveCourse(paper.paperId, enrollment.programId, shortname, categoryId, course.remoteId, 'success');
        const seat = await this.moodle.enrol(input.moodleUserId, course.remoteId, input.active);
        if (seat === 'enrolled') summary.enrolled += 1;
        if (seat === 'removed') summary.removed += 1;
        if (seat === 'exists') summary.updated += 1;
      } catch (error: any) {
        summary.failed += 1;
        summary.error = error?.message || 'Moodle course failed';
        this.logger.warn(`Course sync failed paperId=${paper.paperId} reason=${summary.error}`);
        await this.saveCourse(paper.paperId, enrollment.programId, shortname, categoryId, null, 'failed');
      }
    }
    return summary;
  }

  private async papersFor(enrollment: { programId: number; yearId?: number | null; semId?: number | null }) {
    const rows = await (this.prisma as any).paperDetailMaster.findMany({
      where: { programId: enrollment.programId, IsDeleted: false, IsActive: true },
      orderBy: { paperId: 'asc' },
    });
    const matched = (rows || []).filter((paper: any) => {
      const yearOk = !enrollment.yearId || !paper.yearId || paper.yearId === enrollment.yearId;
      const semOk = !enrollment.semId || !paper.semId || paper.semId === enrollment.semId;
      return yearOk && semOk;
    });
    return matched.slice(0, 30);
  }

  private async saveCourse(paperId: number, programId: number, shortname: string, categoryId: number, courseId: number | null, status: string) {
    await this.prisma.$executeRaw`
      INSERT INTO local_erp_course_mapping (paperId, programId, shortname, moodleCategoryId, moodleCourseId, status, lastSynced)
      VALUES (${paperId}, ${programId}, ${shortname}, ${categoryId}, ${courseId}, ${status}, CURRENT_TIMESTAMP(3))
      ON DUPLICATE KEY UPDATE
        programId = VALUES(programId),
        shortname = VALUES(shortname),
        moodleCategoryId = VALUES(moodleCategoryId),
        moodleCourseId = COALESCE(VALUES(moodleCourseId), moodleCourseId),
        status = VALUES(status),
        lastSynced = CURRENT_TIMESTAMP(3)
    `;
  }
}
