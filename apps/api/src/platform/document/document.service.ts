import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { StorageService } from '../../core/storage/storage.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';
import { RabbitRoutingKeys } from '../../core/rabbit/rabbit.constants';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class DocumentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly rabbit: RabbitService,
  ) {}

  async upload(
    tenantId: string,
    uploadedById: string,
    file: { buffer: Buffer; originalname: string; mimetype: string; size: number },
    dto: UploadDocumentDto,
  ) {
    const storageKey = await this.storage.upload(
      file.buffer,
      file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_'),
      file.mimetype,
      tenantId,
    );

    const document = await this.prisma.document.create({
      data: {
        tenantId,
        uploadedById,
        name: dto.name || file.originalname,
        description: dto.description,
        category: dto.category,
        mimeType: file.mimetype,
        extension: file.originalname.split('.').pop() || '',
        size: file.size,
        storageKey,
        metadata: dto.metadata as any,
        status: 'UPLOADED',
      },
    });

    await this.rabbit.publish(RabbitRoutingKeys.DOCUMENT_PROCESSED, {
      documentId: document.id,
      tenantId,
      storageKey,
      mimeType: file.mimetype,
    });

    return document;
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.category) where.category = query.category;
    if (query.status) where.status = query.status;
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { approvals: true },
      }),
      this.prisma.document.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const document = await this.prisma.document.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { approvals: true, versions: true },
    });
    if (!document) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Document not found', 404);
    }
    return document;
  }

  async download(tenantId: string, id: string) {
    const document = await this.findById(tenantId, id);
    const buffer = await this.storage.download(document.storageKey);
    return { buffer, document };
  }

  async getSignedUrl(tenantId: string, id: string) {
    const document = await this.findById(tenantId, id);
    const url = await this.storage.getPresignedUrl(document.storageKey);
    return { url, expiresIn: 3600 };
  }

  async delete(tenantId: string, id: string) {
    const document = await this.findById(tenantId, id);
    await this.storage.delete(document.storageKey);
    await this.prisma.document.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'REVOKED' },
    });
    return { success: true };
  }

  async addApproval(tenantId: string, documentId: string, approverId: string, sequence: number) {
    await this.findById(tenantId, documentId);
    const approver = await this.prisma.user.findUnique({
      where: { id: approverId },
      select: { firstName: true, lastName: true },
    });
    return this.prisma.documentApproval.create({
      data: {
        documentId,
        approverId,
        approverName: approver ? `${approver.firstName} ${approver.lastName}` : 'Unknown',
        sequence,
      },
    });
  }

  async approve(tenantId: string, documentId: string, approvalId: string, userId: string, comment?: string) {
    await this.findById(tenantId, documentId);
    await this.prisma.documentApproval.update({
      where: { id: approvalId },
      data: { status: 'APPROVED', comment, signedAt: new Date() },
    });
    return this.findById(tenantId, documentId);
  }

  async reject(tenantId: string, documentId: string, approvalId: string, comment: string) {
    await this.findById(tenantId, documentId);
    await this.prisma.documentApproval.update({
      where: { id: approvalId },
      data: { status: 'REJECTED', comment },
    });
    await this.prisma.document.update({
      where: { id: documentId },
      data: { status: 'REJECTED' },
    });
    return this.findById(tenantId, documentId);
  }
}
