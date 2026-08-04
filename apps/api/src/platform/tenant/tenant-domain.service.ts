import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';
import { RabbitRoutingKeys } from '../../core/rabbit/rabbit.constants';

@Injectable()
export class TenantDomainService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitService,
  ) {}

  async resolveByDomain(domain: string) {
    const tenantDomain = await this.prisma.tenantDomain.findUnique({
      where: { domain },
      include: { tenant: true },
    });
    return tenantDomain?.tenant || null;
  }

  async addDomain(tenantId: string, domain: string, isPrimary = false) {
    return this.prisma.tenantDomain.create({
      data: { tenantId, domain, isPrimary },
    });
  }

  async verifyDomain(domain: string) {
    const updated = await this.prisma.tenantDomain.update({
      where: { domain },
      data: { verified: true },
      include: { tenant: true },
    });
    await this.rabbit.publish(RabbitRoutingKeys.NOTIFICATION_CREATED, {
      type: 'email',
      tenantId: updated.tenantId,
      subject: 'Domain verified',
      body: `Domain ${domain} has been verified successfully`,
    });
    return updated;
  }

  async removeDomain(domain: string) {
    await this.prisma.tenantDomain.delete({ where: { domain } });
    return { success: true };
  }
}
