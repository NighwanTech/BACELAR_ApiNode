import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats(tenantId: string) {
    const [
      students,
      faculties,
      programs,
      courses,
      admissions,
      collections,
      invoices,
      books,
      placements,
    ] = await Promise.all([
      this.prisma.student.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.faculty.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.program.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.course.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.admissionApplication.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.payment.aggregate({
        where: { tenantId, status: 'SUCCESS' },
        _sum: { amount: true },
      }),
      this.prisma.invoice.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.libraryBook.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.placementApplication.count({ where: { tenantId, status: 'SELECTED' } }),
    ]);
    return {
      students,
      faculties,
      programs,
      courses,
      admissions,
      totalCollection: collections._sum.amount || 0,
      invoices,
      books,
      selectedStudents: placements,
    };
  }

  async getStudentStats(tenantId: string) {
    const byStatus = await this.prisma.student.groupBy({
      by: ['status'],
      where: { tenantId, deletedAt: null },
      _count: { _all: true },
    });
    const byProgram = await this.prisma.student.groupBy({
      by: ['programId'],
      where: { tenantId, deletedAt: null, programId: { not: null } },
      _count: { _all: true },
    });
    const byCategory = await this.prisma.student.groupBy({
      by: ['category'],
      where: { tenantId, deletedAt: null, category: { not: null } },
      _count: { _all: true },
    });
    const programs = await this.prisma.program.findMany({
      where: { tenantId, deletedAt: null },
      select: { id: true, name: true },
    });
    return {
      byStatus,
      byProgram: byProgram.map((x) => ({
        programId: x.programId,
        programName: programs.find((p) => p.id === x.programId)?.name || 'Unknown',
        count: x._count._all,
      })),
      byCategory,
    };
  }

  async getAdmissionStats(tenantId: string, year?: number) {
    const where: any = { tenantId, deletedAt: null };
    if (year) {
      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year}-12-31`);
      where.createdAt = { gte: start, lte: end };
    }
    const byStatus = await this.prisma.admissionApplication.groupBy({
      by: ['status'],
      where,
      _count: { _all: true },
    });
    const byProgram = await this.prisma.admissionApplication.groupBy({
      by: ['programId'],
      where: { ...where, programId: { not: null } },
      _count: { _all: true },
    });
    const programs = await this.prisma.program.findMany({
      where: { tenantId },
      select: { id: true, name: true },
    });
    return {
      byStatus,
      byProgram: byProgram.map((x) => ({
        programId: x.programId,
        programName: programs.find((p) => p.id === x.programId)?.name || 'Unknown',
        count: x._count._all,
      })),
    };
  }

  async getFinancialSummary(tenantId: string, from?: string, to?: string) {
    const start = from ? new Date(`${from}T00:00:00`) : new Date(0);
    const end = to ? new Date(`${to}T23:59:59`) : new Date();
    const payments = await this.prisma.payment.findMany({
      where: { tenantId, status: 'SUCCESS', paidAt: { gte: start, lte: end } },
      orderBy: { paidAt: 'asc' },
    });
    const total = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const invoices = await this.prisma.invoice.count({
      where: { tenantId, deletedAt: null, createdAt: { gte: start, lte: end } },
    });
    return {
      totalCollected: total,
      transactions: payments.length,
      invoicesGenerated: invoices,
      averageTransaction: payments.length ? total / payments.length : 0,
    };
  }
}
