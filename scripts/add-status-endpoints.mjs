/**
 * One-off script: add PATCH :id/status to all master modules (backend + student-service).
 * Run: node scripts/add-status-endpoints.mjs
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();

const masters = [
  { folder: 'board', idField: 'boardId', cmd: 'board', prisma: 'this.prisma.boardMaster', svc: 'boardService' },
  { folder: 'state', idField: 'stateId', cmd: 'state', prisma: 'this.prisma.stateMaster', svc: 'stateService' },
  { folder: 'city', idField: 'cityId', cmd: 'city', prisma: 'this.prisma.cityMaster', svc: 'cityService' },
  { folder: 'zipcode', idField: 'zipcodeId', cmd: 'zipcode', prisma: 'this.prisma.zipcodeMaster', svc: 'zipcodeService' },
  { folder: 'college', idField: 'collegeId', cmd: 'college', prisma: 'this.collegeMaster', svc: 'collegeService' },
  { folder: 'program-category', idField: 'programCategoryId', cmd: 'program_category', prisma: 'this.prisma.programCategory', svc: 'programCategoryService' },
  { folder: 'program', idField: 'programId', cmd: 'program', prisma: 'this.prisma.program', svc: 'programService' },
  { folder: 'subject', idField: 'subjectId', cmd: 'subject', prisma: 'this.prisma.subjectMaster', svc: 'subjectService' },
  { folder: 'stream', idField: 'streamId', cmd: 'stream', prisma: 'this.prisma.streamMaster', svc: 'streamService' },
  { folder: 'qualification', idField: 'qualificationId', cmd: 'qualification', prisma: 'this.prisma.qualificationMaster', svc: 'qualificationService' },
  { folder: 'admission-session', idField: 'admissionSessionId', cmd: 'admission_session', prisma: 'this.prisma.admissionSession', svc: 'sessionService' },
  { folder: 'academic-session', idField: 'academicSessionId', cmd: 'academic_session', prisma: 'this.prisma.academicSession', svc: 'academicSessionService' },
  { folder: 'examination-details', idField: 'examinationId', cmd: 'examination_details', prisma: 'this.prisma.examinationDetails', svc: 'examinationDetailsService' },
  { folder: 'program-subject', idField: 'programSubjectId', cmd: 'program_subject', prisma: 'this.prisma.programSubjectMaster', svc: 'programSubjectService' },
  { folder: 'program-eligibility', idField: 'eligibilityId', cmd: 'program_eligibility', prisma: 'this.prisma.programEligibility', svc: 'eligibilityService' },
  { folder: 'program-fee-config', idField: 'feeConfigId', cmd: 'program_fee_config', prisma: 'this.prisma.programFeeConfig', svc: 'feeConfigService' },
];

// dedupe board
const seen = new Set();
const uniqueMasters = masters.filter((m) => {
  if (seen.has(m.folder)) return false;
  seen.add(m.folder);
  return true;
});

function ensureImport(content, importLine) {
  if (content.includes(importLine)) return content;
  // add after last import from same area or after first import block
  if (content.includes("from './dto/update-")) {
    return content.replace(
      /(import .+ from '\.\/dto\/update-[^']+';\n)/,
      `$1${importLine}\n`,
    );
  }
  return content.replace(
    /(import .+ from '@nestjs\/swagger';\n)/,
    `$1${importLine}\n`,
  );
}

function patchBackendController(folder, cmd, idField) {
  const file = path.join(root, `apps/backend/src/master/${folder}/${folder}.controller.ts`);
  if (!fs.existsSync(file)) {
    console.warn('skip backend missing', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(`update_status_${cmd}`) || content.includes(`:id/status`)) {
    console.log('backend already', folder);
    return;
  }

  // imports
  if (!content.includes('Patch')) {
    content = content.replace(
      /import \{([^}]+)\} from '@nestjs\/common';/,
      (m, inner) => {
        if (inner.includes('Patch')) return m;
        return `import {${inner.replace(/\s+$/, '')}, Patch } from '@nestjs/common';`;
      },
    );
    // fix double spaces / formatting
    content = content.replace(/,\s*,/g, ',');
  }

  if (!content.includes('UpdateStatusDto')) {
    content = content.replace(
      /(import .+ from '\.\/dto\/[^']+';\n)(?!import)/,
      `$1import { UpdateStatusDto } from '../../common/dto/update-status.dto';\n`,
    );
    // if no dto import matched, add after swagger
    if (!content.includes('UpdateStatusDto')) {
      content = content.replace(
        /(from '@nestjs\/swagger';\n)/,
        `$1import { UpdateStatusDto } from '../../common/dto/update-status.dto';\n`,
      );
    }
  }

  const patchBlock = `
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_${cmd}' },
      { ${idField}: id, ...statusDto },
    );
  }
`;

  // Insert after update() method's closing - find @Put(':id') block end, or before @Delete
  if (content.includes("@Delete(':id')")) {
    content = content.replace("@Delete(':id')", `${patchBlock}\n  @Delete(':id')`);
  } else if (content.includes('@Post(\'bulk-delete\')')) {
    content = content.replace("@Post('bulk-delete')", `${patchBlock}\n  @Post('bulk-delete')`);
  } else {
    // before last closing brace of class
    content = content.replace(/\n\}\s*$/, `${patchBlock}\n}\n`);
  }

  fs.writeFileSync(file, content);
  console.log('backend patched', folder);
}

function patchStudentService(folder, idField, prismaAccess) {
  const file = path.join(root, `apps/student-service/src/master/${folder}/${folder}.service.ts`);
  if (!fs.existsSync(file)) {
    console.warn('skip svc missing', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('async updateStatus(')) {
    console.log('svc already', folder);
    return;
  }

  const method = `
  async updateStatus(${idField}: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(${idField});
    return ${prismaAccess}.update({
      where: { ${idField} },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }
`;

  if (content.includes('async softDelete(')) {
    content = content.replace('async softDelete(', `${method}\n  async softDelete(`);
  } else {
    content = content.replace(/\n\}\s*$/, `${method}\n}\n`);
  }

  fs.writeFileSync(file, content);
  console.log('svc patched', folder);
}

function patchStudentController(folder, cmd, idField, svc) {
  const file = path.join(root, `apps/student-service/src/master/${folder}/${folder}.controller.ts`);
  if (!fs.existsSync(file)) {
    console.warn('skip ctrl missing', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(`update_status_${cmd}`)) {
    console.log('ctrl already', folder);
    return;
  }

  const block = `
  @MessagePattern({ cmd: 'update_status_${cmd}' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.${svc}.updateStatus(
        data.${idField},
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
`;

  if (content.includes(`cmd: 'delete_${cmd}'`) || content.includes(`cmd: 'delete_${cmd}`)) {
    // insert before delete pattern
    const re = new RegExp(`@MessagePattern\\(\\{ cmd: 'delete_${cmd}' \\}\\)`);
    if (re.test(content)) {
      content = content.replace(re, `${block}\n  @MessagePattern({ cmd: 'delete_${cmd}' })`);
    } else {
      content = content.replace(/\n\}\s*$/, `${block}\n}\n`);
    }
  } else {
    content = content.replace(/\n\}\s*$/, `${block}\n}\n`);
  }

  fs.writeFileSync(file, content);
  console.log('ctrl patched', folder);
}

// Shared DTO
const dtoPath = path.join(root, 'apps/backend/src/common/dto/update-status.dto.ts');
fs.mkdirSync(path.dirname(dtoPath), { recursive: true });
fs.writeFileSync(
  dtoPath,
  `import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({ example: true, description: 'Active / Inactive flag' })
  @IsBoolean()
  @IsNotEmpty()
  IsActive: boolean;

  @ApiProperty({ example: 'Admin User', description: 'User updating the status' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;
}
`,
);
console.log('dto written');

for (const m of uniqueMasters) {
  patchBackendController(m.folder, m.cmd, m.idField);
  patchStudentService(m.folder, m.idField, m.prisma);
  patchStudentController(m.folder, m.cmd, m.idField, m.svc);
}

console.log('done masters', uniqueMasters.length);
