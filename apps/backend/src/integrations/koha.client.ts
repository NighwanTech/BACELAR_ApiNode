import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { shouldRetryStatus, splitName } from './identity.util';

export type RemoteResult = { action: 'created' | 'updated' | 'suspended'; remoteId: number };

@Injectable()
export class KohaClient {
  private readonly logger = new Logger(KohaClient.name);
  private token = '';
  private tokenExpiresAt = 0;

  constructor(private readonly config: ConfigService) {}

  private settings() {
    const base = (this.config.get<string>('KOHA_BASE_URL') || '').replace(/\/$/, '');
    const clientId = this.config.get<string>('KOHA_CLIENT_ID') || '';
    const clientSecret = this.config.get<string>('KOHA_CLIENT_SECRET') || '';
    if (!base || !clientId || !clientSecret) throw new Error('Koha integration is not configured');
    return {
      base,
      clientId,
      clientSecret,
      libraryId: this.config.get<string>('KOHA_LIBRARY_ID') || 'BAC',
      categoryId: this.config.get<string>('KOHA_STUDENT_CATEGORY') || 'STUDENT',
    };
  }

  private async accessToken() {
    if (this.token && Date.now() < this.tokenExpiresAt) return this.token;
    const { base, clientId, clientSecret } = this.settings();
    const response = await fetch(`${base}/api/v1/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      signal: AbortSignal.timeout(20000),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token) {
      this.logger.warn(`Koha token failed status=${response.status}`);
      throw new Error('Koha authentication failed');
    }
    this.token = data.access_token;
    this.tokenExpiresAt = Date.now() + Math.max(30, Number(data.expires_in || 300) - 30) * 1000;
    return this.token;
  }

  private async request(method: string, path: string, body?: unknown) {
    const { base } = this.settings();
    let lastError = 'Koha request failed';
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const token = await this.accessToken();
      const response = await fetch(`${base}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(20000),
      });
      if (response.status === 401) {
        this.token = '';
      }
      if (shouldRetryStatus(response.status) && attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt));
        lastError = `Koha HTTP ${response.status}`;
        continue;
      }
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        this.logger.warn(`Koha ${method} ${path} failed status=${response.status}`);
        throw new Error(typeof data?.error === 'string' ? data.error : `Koha HTTP ${response.status}`);
      }
      return data;
    }
    throw new Error(lastError);
  }

  async findByCardNumber(enrollmentNo: string) {
    const rows = await this.request('GET', `/api/v1/patrons?cardnumber=${encodeURIComponent(enrollmentNo)}`);
    const list = Array.isArray(rows) ? rows : rows?.patrons || [];
    return list.find((row: any) => String(row.cardnumber) === enrollmentNo) || list[0] || null;
  }

  async setPassword(patronId: number, password: string) {
    await this.request('POST', `/api/v1/patrons/${patronId}/password`, {
      password,
      password_2: password,
    });
  }

  async upsert(input: { enrollmentNo: string; studentName?: string | null; email?: string | null; active: boolean; password?: string | null }): Promise<RemoteResult> {
    const { libraryId, categoryId } = this.settings();
    const name = splitName(input.studentName);
    const existing = await this.findByCardNumber(input.enrollmentNo);
    const payload: Record<string, unknown> = {
      cardnumber: input.enrollmentNo,
      firstname: name.firstname,
      surname: name.lastname === '.' ? name.firstname : name.lastname,
      library_id: libraryId,
      category_id: categoryId,
      ...(input.email ? { email: input.email } : {}),
    };
    if (!input.active) payload.expiry_date = new Date().toISOString().slice(0, 10);
    let remoteId = 0;
    let action: RemoteResult['action'] = 'created';
    if (existing?.patron_id) {
      remoteId = Number(existing.patron_id);
      await this.request('PUT', `/api/v1/patrons/${remoteId}`, payload);
      action = input.active ? 'updated' : 'suspended';
    } else {
      const created = await this.request('POST', '/api/v1/patrons', payload);
      remoteId = Number(created?.patron_id);
      if (!remoteId) throw new Error('Koha did not return a patron id');
    }
    if (input.password) await this.setPassword(remoteId, input.password);
    return { action, remoteId };
  }
}
