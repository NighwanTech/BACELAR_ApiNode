import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { moodleUsername, shouldRetryStatus, splitName } from './identity.util';

export type RemoteResult = { action: 'created' | 'updated' | 'suspended'; remoteId: number };

@Injectable()
export class MoodleClient {
  private readonly logger = new Logger(MoodleClient.name);

  constructor(private readonly config: ConfigService) {}

  private configOrThrow() {
    const base = (this.config.get<string>('MOODLE_BASE_URL') || '').replace(/\/$/, '');
    const token = this.config.get<string>('MOODLE_WS_TOKEN') || '';
    if (!base || !token) throw new Error('Moodle integration is not configured');
    return { base, token };
  }

  private async call(wsfunction: string, params: Record<string, string>) {
    const { base, token } = this.configOrThrow();
    const body = new URLSearchParams({
      wstoken: token,
      wsfunction,
      moodlewsrestformat: 'json',
      ...params,
    });
    let lastError = 'Moodle request failed';
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const response = await fetch(`${base}/webservice/rest/server.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: AbortSignal.timeout(20000),
      });
      const text = await response.text();
      if (shouldRetryStatus(response.status) && attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt));
        lastError = `Moodle HTTP ${response.status}`;
        continue;
      }
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }
      if (!response.ok || data?.exception) {
        this.logger.warn(`Moodle ${wsfunction} failed status=${response.status}`);
        const detail = [data?.message, data?.debuginfo].filter(Boolean).join(' | ');
        throw new Error(detail || `Moodle HTTP ${response.status}`);
      }
      return data;
    }
    throw new Error(lastError);
  }

  private async findByField(field: string, value: string) {
    const data = await this.call('core_user_get_users', {
      'criteria[0][key]': field,
      'criteria[0][value]': value,
    });
    const users = Array.isArray(data?.users) ? data.users : [];
    return users[0] || null;
  }

  async findByIdNumber(enrollmentNo: string) {
    return (
      (await this.findByField('idnumber', enrollmentNo)) ||
      (await this.findByField('username', moodleUsername(enrollmentNo)))
    );
  }

  async upsert(input: { enrollmentNo: string; studentName?: string | null; email?: string | null; active: boolean; password?: string | null }): Promise<RemoteResult> {
    const existing = await this.findByIdNumber(input.enrollmentNo);
    const name = splitName(input.studentName);
    const suspended = input.active ? '0' : '1';
    if (existing?.id) {
      await this.call('core_user_update_users', {
        'users[0][id]': String(existing.id),
        'users[0][idnumber]': input.enrollmentNo,
        'users[0][firstname]': name.firstname,
        'users[0][lastname]': name.lastname,
        ...(input.email ? { 'users[0][email]': input.email } : {}),
        ...(input.password ? { 'users[0][password]': input.password } : {}),
        'users[0][suspended]': suspended,
      });
      return { action: input.active ? 'updated' : 'suspended', remoteId: Number(existing.id) };
    }
    if (!input.email) throw new Error('Moodle user needs an email on first create');
    const created = await this.call('core_user_create_users', {
      'users[0][username]': moodleUsername(input.enrollmentNo),
      'users[0][password]': input.password || `Aa1!${randomBytes(9).toString('hex')}`,
      'users[0][firstname]': name.firstname,
      'users[0][lastname]': name.lastname,
      'users[0][email]': input.email,
      'users[0][idnumber]': input.enrollmentNo,
      'users[0][auth]': 'manual',
    });
    const id = Number(created?.[0]?.id);
    if (!id) throw new Error('Moodle did not return a user id');
    if (!input.active) {
      await this.call('core_user_update_users', {
        'users[0][id]': String(id),
        'users[0][suspended]': '1',
      });
      return { action: 'suspended', remoteId: id };
    }
    return { action: 'created', remoteId: id };
  }

  async upsertCategory(name: string, idnumber: string) {
    const found = await this.call('core_course_get_categories', {
      'criteria[0][key]': 'idnumber',
      'criteria[0][value]': idnumber,
    });
    const existing = Array.isArray(found) ? found[0] : null;
    if (existing?.id) return Number(existing.id);
    const created = await this.call('core_course_create_categories', {
      'categories[0][name]': name,
      'categories[0][idnumber]': idnumber,
      'categories[0][parent]': '0',
    });
    const id = Number(created?.[0]?.id);
    if (!id) throw new Error('Moodle did not return a category id');
    return id;
  }

  async upsertCourse(input: { shortname: string; fullname: string; categoryId: number }) {
    const found = await this.call('core_course_get_courses_by_field', {
      field: 'shortname',
      value: input.shortname,
    });
    const existing = Array.isArray(found?.courses) ? found.courses[0] : null;
    if (existing?.id) {
      await this.call('core_course_update_courses', {
        'courses[0][id]': String(existing.id),
        'courses[0][fullname]': input.fullname,
        'courses[0][shortname]': input.shortname,
        'courses[0][categoryid]': String(input.categoryId),
      });
      return { action: 'updated' as const, remoteId: Number(existing.id) };
    }
    const created = await this.call('core_course_create_courses', {
      'courses[0][fullname]': input.fullname,
      'courses[0][shortname]': input.shortname,
      'courses[0][categoryid]': String(input.categoryId),
    });
    const id = Number(created?.[0]?.id);
    if (!id) throw new Error('Moodle did not return a course id');
    return { action: 'created' as const, remoteId: id };
  }

  async enrol(userId: number, courseId: number, active: boolean) {
    if (!active) {
      await this.call('enrol_manual_unenrol_users', {
        'enrolments[0][userid]': String(userId),
        'enrolments[0][courseid]': String(courseId),
      });
      return 'removed' as const;
    }
    const courses = await this.call('core_enrol_get_users_courses', { userid: String(userId) });
    const list = Array.isArray(courses) ? courses : [];
    if (list.some((course: any) => Number(course.id) === courseId)) return 'exists' as const;
    await this.call('enrol_manual_enrol_users', {
      'enrolments[0][roleid]': '5',
      'enrolments[0][userid]': String(userId),
      'enrolments[0][courseid]': String(courseId),
    });
    return 'enrolled' as const;
  }
}
