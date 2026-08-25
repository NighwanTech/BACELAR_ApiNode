import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';

const RULE_TYPES = new Set(['SUBJECT', 'MIN_PERCENT', 'STREAM', 'QUALIFICATION']);
const LEVELS = new Set(['10TH', '12TH', 'GRAD', 'PG', 'ALL']);
const SEVERITIES = new Set(['Compulsory', 'Recommended']);

function normalizeCategory(category: string): string {
  return String(category || 'GEN').trim().toUpperCase() || 'GEN';
}

/** Whether a rule's category applies to the student's category */
export function categoryMatches(ruleCategory: string, studentCategory: string): boolean {
  const rule = normalizeCategory(ruleCategory || 'ALL');
  const student = normalizeCategory(studentCategory);
  if (rule === 'ALL') return true;
  if (rule === student) return true;
  if (rule === 'GENERAL') {
    return ['GEN', 'OBC', 'MINORITY'].includes(student);
  }
  if (rule === 'RESERVED') {
    return ['SC', 'ST'].includes(student);
  }
  return false;
}

@Injectable()
export class ProgramEligibilityService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertProgram(programId: number) {
    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }
    return program;
  }

  /** SUBJECT ruleKey must match subjectMaster.subjectCode (OR-list allowed: 12BIO|12AGRI) */
  private async assertSubjectRuleKeysFromMaster(ruleKey: string) {
    const codes = String(ruleKey || '')
      .split('|')
      .map((k) => k.trim())
      .filter(Boolean);
    if (codes.length === 0) {
      throw new BadRequestException('ruleKey is required for SUBJECT rules');
    }

    const found = await this.prisma.subjectMaster.findMany({
      where: {
        IsDeleted: false,
        OR: codes.map((code) => ({
          subjectCode: { equals: code },
        })),
      },
      select: { subjectCode: true },
    });
    const foundUpper = new Set(
      found.map((s) => String(s.subjectCode || '').trim().toUpperCase()),
    );
    const missing = codes.filter(
      (c) => !foundUpper.has(c.trim().toUpperCase()),
    );
    if (missing.length > 0) {
      throw new BadRequestException(
        `SUBJECT ruleKey must match SubjectMaster.subjectCode. Missing: ${missing.join(', ')}`,
      );
    }
  }

  private validateRulePayload(data: any, partial = false) {
    if (!partial || data.ruleType !== undefined) {
      if (!RULE_TYPES.has(String(data.ruleType))) {
        throw new BadRequestException(
          'ruleType must be SUBJECT | MIN_PERCENT | STREAM | QUALIFICATION',
        );
      }
    }
    if (!partial || data.qualificationLevel !== undefined) {
      if (!LEVELS.has(String(data.qualificationLevel))) {
        throw new BadRequestException(
          'qualificationLevel must be 10TH | 12TH | GRAD | PG | ALL',
        );
      }
    }
    if (!partial || data.severity !== undefined) {
      if (data.severity && !SEVERITIES.has(String(data.severity))) {
        throw new BadRequestException('severity must be Compulsory | Recommended');
      }
    }
    const ruleType = data.ruleType;
    if (ruleType === 'MIN_PERCENT') {
      const pct = data.minPercent;
      if (pct === undefined || pct === null || Number.isNaN(Number(pct))) {
        if (!partial) {
          throw new BadRequestException('minPercent is required for MIN_PERCENT rules');
        }
      }
    }
    if (ruleType === 'SUBJECT' || ruleType === 'STREAM' || ruleType === 'QUALIFICATION') {
      if (!partial && !String(data.ruleKey || '').trim()) {
        throw new BadRequestException(`ruleKey is required for ${ruleType} rules`);
      }
    }
  }

  async create(data: any) {
    await this.assertProgram(Number(data.programId));
    this.validateRulePayload(data, false);
    const ruleType = String(data.ruleType).trim().toUpperCase();
    if (ruleType === 'SUBJECT') {
      await this.assertSubjectRuleKeysFromMaster(String(data.ruleKey || ''));
    }

    return this.prisma.programEligibility.create({
      data: {
        programId: Number(data.programId),
        ruleType,
        qualificationLevel: String(data.qualificationLevel).trim().toUpperCase(),
        category: String(data.category || 'ALL').trim().toUpperCase(),
        ruleKey: data.ruleKey ? String(data.ruleKey).trim() : null,
        minPercent:
          data.minPercent !== undefined && data.minPercent !== null
            ? new Prisma.Decimal(data.minPercent)
            : null,
        severity: data.severity || 'Compulsory',
        displayOrder: data.displayOrder ?? 0,
        message: String(data.message).trim(),
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(filters?: {
    programId?: number;
    ruleType?: string;
    category?: string;
    severity?: string;
  }) {
    const eligibility = (this.prisma as { programEligibility?: { findMany: Function } })
      .programEligibility;
    if (!eligibility?.findMany) {
      throw new BadRequestException(
        'Prisma client is outdated (programEligibility missing). Run: npx prisma generate && restart student-service',
      );
    }

    return this.prisma.programEligibility.findMany({
      where: {
        IsDeleted: false,
        ...(filters?.programId ? { programId: Number(filters.programId) } : {}),
        ...(filters?.ruleType
          ? { ruleType: String(filters.ruleType).trim().toUpperCase() }
          : {}),
        ...(filters?.severity ? { severity: filters.severity } : {}),
        ...(filters?.category
          ? {
              OR: [
                { category: 'ALL' },
                { category: String(filters.category).trim().toUpperCase() },
                ...(normalizeCategory(filters.category) === 'SC' ||
                normalizeCategory(filters.category) === 'ST'
                  ? [{ category: 'RESERVED' }]
                  : [{ category: 'GENERAL' }]),
              ],
            }
          : {}),
      },
      include: {
        program: {
          select: {
            programId: true,
            programName: true,
            programShortName: true,
            programCode: true,
          },
        },
      },
      orderBy: [{ programId: 'asc' }, { displayOrder: 'asc' }, { eligibilityId: 'asc' }],
    });
  }

  async findOne(eligibilityId: number) {
    const row = await this.prisma.programEligibility.findFirst({
      where: { eligibilityId, IsDeleted: false },
      include: {
        program: {
          select: {
            programId: true,
            programName: true,
            programShortName: true,
            programCode: true,
          },
        },
      },
    });
    if (!row) {
      throw new NotFoundException(`Eligibility rule with ID ${eligibilityId} not found`);
    }
    return row;
  }

  async update(eligibilityId: number, data: any) {
    const current = await this.findOne(eligibilityId);
    if (data.programId !== undefined) {
      await this.assertProgram(Number(data.programId));
    }
    this.validateRulePayload(
      {
        ruleType: data.ruleType,
        qualificationLevel: data.qualificationLevel,
        severity: data.severity,
        minPercent: data.minPercent,
        ruleKey: data.ruleKey,
      },
      true,
    );
    const nextType = data.ruleType
      ? String(data.ruleType).trim().toUpperCase()
      : String(current.ruleType || '').toUpperCase();
    const nextKey =
      data.ruleKey !== undefined ? data.ruleKey : current.ruleKey;
    if (nextType === 'SUBJECT' && nextKey != null) {
      await this.assertSubjectRuleKeysFromMaster(String(nextKey));
    }

    return this.prisma.programEligibility.update({
      where: { eligibilityId },
      data: {
        programId: data.programId !== undefined ? Number(data.programId) : undefined,
        ruleType: data.ruleType
          ? String(data.ruleType).trim().toUpperCase()
          : undefined,
        qualificationLevel: data.qualificationLevel
          ? String(data.qualificationLevel).trim().toUpperCase()
          : undefined,
        category: data.category
          ? String(data.category).trim().toUpperCase()
          : undefined,
        ruleKey:
          data.ruleKey !== undefined
            ? data.ruleKey
              ? String(data.ruleKey).trim()
              : null
            : undefined,
        minPercent:
          data.minPercent !== undefined
            ? data.minPercent === null
              ? null
              : new Prisma.Decimal(data.minPercent)
            : undefined,
        severity: data.severity,
        displayOrder: data.displayOrder,
        message: data.message !== undefined ? String(data.message).trim() : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(eligibilityId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(eligibilityId);
    return this.prisma.programEligibility.update({
      where: { eligibilityId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(
    eligibilityId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(eligibilityId);
    return this.prisma.programEligibility.update({
      where: { eligibilityId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  /**
   * Validate student academic snapshot against compulsory rules for a program.
   */
  async validate(payload: {
    programId: number;
    category?: string;
    tenthPercentage?: number;
    twelfthPercentage?: number;
    graduationPercentage?: number;
    pgPercentage?: number;
    twelfthStream?: string;
    /** Subject codes selected in 12th, e.g. ["12MATH","12ENG"] */
    twelfthSubjectCodes?: string[];
    hasGraduation?: boolean;
    hasPg?: boolean;
    /** B.P.Ed.: when true, SPORT_CERT min-% rules apply; else NO_SPORT_CERT */
    hasSportCertificate?: boolean;
  }) {
    const programId = Number(payload.programId);
    await this.assertProgram(programId);

    const rules = await this.prisma.programEligibility.findMany({
      where: {
        programId,
        IsDeleted: false,
        IsActive: true,
        severity: 'Compulsory',
      },
      orderBy: [{ displayOrder: 'asc' }, { eligibilityId: 'asc' }],
    });

    const category = payload.category || 'GEN';
    const subjectCodes = (payload.twelfthSubjectCodes || []).map((c) =>
      String(c).trim().toUpperCase(),
    );
    const stream = String(payload.twelfthStream || '').trim().toUpperCase();
    const hasSportCertificate = Boolean(payload.hasSportCertificate);
    const errors: string[] = [];

    const percentForLevel = (level: string): number => {
      switch (level) {
        case '10TH':
          return Number(payload.tenthPercentage) || 0;
        case '12TH':
          return Number(payload.twelfthPercentage) || 0;
        case 'GRAD':
          return Number(payload.graduationPercentage) || 0;
        case 'PG':
          return Number(payload.pgPercentage) || 0;
        default:
          return Number(payload.twelfthPercentage) || 0;
      }
    };

    for (const rule of rules) {
      if (!categoryMatches(rule.category, category)) continue;

      if (rule.ruleType === 'SUBJECT') {
        const keys = String(rule.ruleKey || '')
          .split('|')
          .map((k) => k.trim().toUpperCase())
          .filter(Boolean);
        const ok = keys.some((k) => subjectCodes.includes(k));
        if (!ok) errors.push(rule.message);
        continue;
      }

      if (rule.ruleType === 'STREAM') {
        const requiredKeys = String(rule.ruleKey || '')
          .split('|')
          .map((k) => k.trim().toUpperCase())
          .filter(Boolean);
        if (requiredKeys.length === 0) continue;
        if (!stream) {
          errors.push(rule.message);
        } else if (!requiredKeys.includes(stream)) {
          errors.push(rule.message);
        }
        continue;
      }

      if (rule.ruleType === 'MIN_PERCENT') {
        const ruleKey = String(rule.ruleKey || 'AGGREGATE').trim().toUpperCase();
        // Conditional graduation thresholds (admin-editable via ruleKey)
        if (ruleKey === 'SPORT_CERT' && !hasSportCertificate) continue;
        if (ruleKey === 'NO_SPORT_CERT' && hasSportCertificate) continue;

        const min = rule.minPercent != null ? Number(rule.minPercent) : NaN;
        if (Number.isNaN(min)) continue;
        const actual = percentForLevel(rule.qualificationLevel);
        if (actual < min) errors.push(rule.message);
        continue;
      }

      if (rule.ruleType === 'QUALIFICATION') {
        const key = String(rule.ruleKey || '').trim().toUpperCase();
        if (key === 'GRADUATION' || key === 'GRAD') {
          if (!payload.hasGraduation) errors.push(rule.message);
        } else if (key === 'PG' || key === 'POST_GRADUATION') {
          if (!payload.hasPg) errors.push(rule.message);
        }
      }
    }

    return {
      ok: errors.length === 0,
      programId,
      category: normalizeCategory(category),
      hasSportCertificate,
      errors,
    };
  }
}
