/**
 * Add PATCH :id/status for website modules (reuses service.update).
 */
import fs from 'fs';
import path from 'path';

const root = process.cwd();

const websites = [
  { folder: 'testimonial', idField: 'testimonialId', cmd: 'testimonial', svc: 'testimonialService', backendFile: 'testimonial' },
  { folder: 'stats-counter', idField: 'statsCounterId', cmd: 'stats_counter', svc: 'statsCounterService', backendFile: 'stats-counter' },
  { folder: 'campus-quick-link', idField: 'quickLinkId', cmd: 'campus_quick_link', svc: 'campusQuickLinkService', backendFile: 'campus-quick-link' },
  { folder: 'hero-section', idField: 'heroSectionId', cmd: 'hero_section', svc: 'heroSectionService', backendFile: 'hero-section' },
  { folder: 'latest-update', idField: 'latestUpdateId', cmd: 'latest_update', svc: 'latestUpdateService', backendFile: 'latest-update' },
  { folder: 'notice-board', idField: 'noticeBoardId', cmd: 'notice_board', svc: 'noticeBoardService', backendFile: 'notice-board' },
  { folder: 'accreditation-slider', idField: 'accreditationSliderId', cmd: 'accreditation_slider', svc: 'accreditationSliderService', backendFile: 'accreditation-slider' },
  { folder: 'top-achiever', idField: 'topAchieverId', cmd: 'top_achiever', svc: 'topAchieverService', backendFile: 'top-achiever' },
  { folder: 'image-gallery', idField: 'imageGalleryId', cmd: 'image_gallery', svc: 'imageGalleryService', backendFile: 'image-gallery' },
  { folder: 'video-gallery', idField: 'videoGalleryId', cmd: 'video_gallery', svc: 'videoGalleryService', backendFile: 'video-gallery' },
  { folder: 'header-button', idField: 'headerButtonId', cmd: 'header_button', svc: 'headerButtonService', backendFile: 'header-button' },
  { folder: 'contact-enquiry', idField: 'contactEnquiryId', cmd: 'contact_enquiry', svc: 'contactEnquiryService', backendFile: 'contact-enquiry' },
  { folder: 'admission-enquiry', idField: 'admissionEnquiryId', cmd: 'admission_enquiry', svc: 'admissionEnquiryService', backendFile: 'admission-enquiry' },
];

function patchBackend(folder, cmd, idField) {
  const file = path.join(root, `apps/backend/src/website/${folder}/${folder}.controller.ts`);
  if (!fs.existsSync(file)) {
    console.warn('missing backend', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(':id/status')) {
    console.log('backend already', folder);
    return;
  }
  if (!content.includes('Patch')) {
    content = content.replace(
      /import \{([^}]+)\} from '@nestjs\/common';/,
      (m, inner) => `import {${inner.trim().replace(/\s+$/, '')}, Patch } from '@nestjs/common';`,
    );
  }
  if (!content.includes('UpdateStatusDto')) {
    content = content.replace(
      /(from '@nestjs\/swagger';\n)/,
      `$1import { UpdateStatusDto } from '../../common/dto/update-status.dto';\n`,
    );
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
  if (content.includes("@Delete(':id')")) {
    content = content.replace("@Delete(':id')", `${patchBlock}\n  @Delete(':id')`);
  } else {
    content = content.replace(/\n\}\s*$/, `${patchBlock}\n}\n`);
  }
  fs.writeFileSync(file, content);
  console.log('backend', folder);
}

function patchSvc(folder, idField) {
  const file = path.join(root, `apps/student-service/src/website/${folder}/${folder}.service.ts`);
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('async updateStatus(')) {
    console.log('svc already', folder);
    return;
  }
  const method = `
  async updateStatus(${idField}: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(${idField}, { IsActive, UpdatedBy });
  }
`;
  if (content.includes('async softDelete(')) {
    content = content.replace('async softDelete(', `${method}\n  async softDelete(`);
  } else {
    content = content.replace(/\n\}\s*$/, `${method}\n}\n`);
  }
  fs.writeFileSync(file, content);
  console.log('svc', folder);
}

function patchCtrl(folder, cmd, idField, svc) {
  const file = path.join(root, `apps/student-service/src/website/${folder}/${folder}.controller.ts`);
  if (!fs.existsSync(file)) return;
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
  const re = new RegExp(`@MessagePattern\\(\\{ cmd: 'delete_${cmd}' \\}\\)`);
  if (re.test(content)) {
    content = content.replace(re, `${block}\n  @MessagePattern({ cmd: 'delete_${cmd}' })`);
  } else {
    content = content.replace(/\n\}\s*$/, `${block}\n}\n`);
  }
  fs.writeFileSync(file, content);
  console.log('ctrl', folder);
}

for (const w of websites) {
  patchBackend(w.backendFile, w.cmd, w.idField);
  patchSvc(w.folder, w.idField);
  patchCtrl(w.folder, w.cmd, w.idField, w.svc);
}
console.log('website done');
