import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

const CREATE_ERROR_LOG_TABLE = `
CREATE TABLE IF NOT EXISTS \`errorLog\` (
  \`ErrorID\` INT NOT NULL AUTO_INCREMENT,
  \`Source\` VARCHAR(20) NOT NULL,
  \`ErrorDescription\` TEXT NOT NULL,
  \`StackTrace\` MEDIUMTEXT NULL,
  \`ApiUrl\` VARCHAR(500) NULL,
  \`HttpMethod\` VARCHAR(10) NULL,
  \`StatusCode\` INT NULL,
  \`UserId\` INT NULL,
  \`LoginBy\` VARCHAR(255) NULL,
  \`IpAddress\` VARCHAR(64) NULL,
  \`ErrorTime\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  \`ErrorStatus\` VARCHAR(20) NOT NULL DEFAULT 'Open',
  \`ResolvedOn\` DATETIME(3) NULL,
  PRIMARY KEY (\`ErrorID\`),
  INDEX \`errorLog_Source_idx\` (\`Source\`),
  INDEX \`errorLog_ErrorTime_idx\` (\`ErrorTime\`),
  INDEX \`errorLog_ErrorStatus_idx\` (\`ErrorStatus\`),
  INDEX \`errorLog_ResolvedOn_idx\` (\`ResolvedOn\`)
)
`;

const ALTER_ERROR_LOG_RESOLVED_ON = `
ALTER TABLE \`errorLog\` ADD COLUMN IF NOT EXISTS \`ResolvedOn\` DATETIME(3) NULL AFTER \`ErrorStatus\`
`;

const CREATE_RESOLVED_TRIGGER = `
CREATE TRIGGER errorLog_set_resolved_on
BEFORE UPDATE ON errorLog
FOR EACH ROW
BEGIN
  IF NEW.ErrorStatus = 'Resolved' AND OLD.ErrorStatus <> 'Resolved' THEN
    SET NEW.ResolvedOn = CURRENT_TIMESTAMP(3);
  ELSEIF NEW.ErrorStatus <> 'Resolved' THEN
    SET NEW.ResolvedOn = NULL;
  END IF;
END
`;

const CREATE_DELETE_EVENT = `
CREATE EVENT errorLog_delete_resolved
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
  DELETE FROM errorLog
  WHERE ErrorStatus = 'Resolved'
    AND ResolvedOn IS NOT NULL
    AND ResolvedOn < DATE_SUB(NOW(3), INTERVAL 5 DAY)
`;

export type ErrorLogInput = {
  source: 'Admin' | 'Website';
  description: string;
  stack: string | null;
  apiUrl: string | null;
  httpMethod: string | null;
  statusCode: number;
  userId: number | null;
  loginBy: string | null;
  ipAddress: string | null;
};

/** Writes unexpected server errors from admin and website into errorLog. */
@Injectable()
export class ErrorLogService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    try {
      await this.prisma.$executeRawUnsafe(CREATE_ERROR_LOG_TABLE);
      await this.prisma.$executeRawUnsafe(ALTER_ERROR_LOG_RESOLVED_ON);
      await this.ensureResolvedTrigger();
      await this.ensureDeleteEvent();
      await this.purgeResolved();
    } catch (error) {
      console.error('ErrorLog table setup failed', error instanceof Error ? error.message : error);
    }
  }

  async findAll(source?: string, status?: string) {
    await this.purgeResolved();
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT ErrorID, Source, ErrorDescription, StackTrace, ApiUrl, HttpMethod,
             StatusCode, UserId, LoginBy, IpAddress, ErrorTime, ErrorStatus, ResolvedOn
      FROM errorLog
      WHERE (${source || null} IS NULL OR Source = ${source || null})
        AND (${status || null} IS NULL OR ErrorStatus = ${status || null})
      ORDER BY ErrorTime DESC
    `;
    return rows.map(presentRow);
  }

  async updateStatus(errorId: number, status: 'Open' | 'Resolved') {
    const resolvedOn = status === 'Resolved' ? new Date() : null;
    const count = await this.prisma.$executeRaw`
      UPDATE errorLog
      SET ErrorStatus = ${status},
          ResolvedOn = ${resolvedOn}
      WHERE ErrorID = ${errorId}
    `;
    if (Number(count) === 0) return null;
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT ErrorID, Source, ErrorDescription, StackTrace, ApiUrl, HttpMethod,
             StatusCode, UserId, LoginBy, IpAddress, ErrorTime, ErrorStatus, ResolvedOn
      FROM errorLog
      WHERE ErrorID = ${errorId}
      LIMIT 1
    `;
    return rows[0] ? presentRow(rows[0]) : null;
  }

  private async purgeResolved() {
    await this.prisma.$executeRaw`
      DELETE FROM errorLog
      WHERE ErrorStatus = 'Resolved'
        AND ResolvedOn IS NOT NULL
        AND ResolvedOn < DATE_SUB(NOW(3), INTERVAL 5 DAY)
    `;
  }

  private async ensureResolvedTrigger() {
    try {
      const existing = await this.prisma.$queryRaw<any[]>`
        SELECT TRIGGER_NAME AS name
        FROM information_schema.TRIGGERS
        WHERE TRIGGER_SCHEMA = DATABASE() AND TRIGGER_NAME = 'errorLog_set_resolved_on'
      `;
      if (existing.length > 0) return;
      await this.prisma.$executeRawUnsafe(CREATE_RESOLVED_TRIGGER);
    } catch (error) {
      console.error('ErrorLog resolved trigger was not created', error instanceof Error ? error.message : error);
    }
  }

  private async ensureDeleteEvent() {
    try {
      const existing = await this.prisma.$queryRaw<any[]>`
        SELECT EVENT_NAME AS name
        FROM information_schema.EVENTS
        WHERE EVENT_SCHEMA = DATABASE() AND EVENT_NAME = 'errorLog_delete_resolved'
      `;
      if (existing.length > 0) return;
      await this.prisma.$executeRawUnsafe(CREATE_DELETE_EVENT);
    } catch (error) {
      console.error('ErrorLog delete event was not created', error instanceof Error ? error.message : error);
    }
  }

  async record(input: ErrorLogInput) {
    const description = clip(redact(input.description), 4000) || 'Internal server error';
    await this.prisma.$executeRaw`
      INSERT INTO errorLog (
        Source, ErrorDescription, StackTrace, ApiUrl, HttpMethod,
        StatusCode, UserId, LoginBy, IpAddress, ErrorStatus
      ) VALUES (
        ${input.source},
        ${description},
        ${input.stack ? clip(redact(input.stack), 12000) : null},
        ${clip(input.apiUrl, 500)},
        ${clip(input.httpMethod, 10)},
        ${input.statusCode},
        ${input.userId},
        ${clip(input.loginBy, 255)},
        ${clip(input.ipAddress, 64)},
        ${'Open'}
      )
    `;
  }
}

function presentRow(row: any) {
  return {
    ErrorID: Number(row.ErrorID),
    Source: row.Source,
    ErrorDescription: row.ErrorDescription,
    StackTrace: row.StackTrace ?? null,
    ApiUrl: row.ApiUrl ?? null,
    HttpMethod: row.HttpMethod ?? null,
    StatusCode: row.StatusCode == null ? null : Number(row.StatusCode),
    UserId: row.UserId == null ? null : Number(row.UserId),
    LoginBy: row.LoginBy ?? null,
    IpAddress: row.IpAddress ?? null,
    ErrorTime: toIso(row.ErrorTime),
    ErrorStatus: row.ErrorStatus,
    ResolvedOn: toIso(row.ResolvedOn),
  };
}

function toIso(value: unknown) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

function clip(value: string | null | undefined, max: number) {
  if (!value) return null;
  const text = value.trim();
  if (!text) return null;
  return text.length > max ? text.slice(0, max) : text;
}

function redact(value: string) {
  return value.replace(
    /("?(?:password|token|authorization|aadhar|aadhaar|pan(?:no)?)"?\s*[:=]\s*)(?:"[^"]*"|'[^']*'|\S+)/gi,
    '$1[redacted]',
  );
}
