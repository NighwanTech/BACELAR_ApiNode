import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class LibraryService {
  constructor(private readonly prisma: PrismaService) {}

  async addBook(tenantId: string, dto: any) {
    return this.prisma.libraryBook.create({
      data: {
        tenantId,
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn,
        publisher: dto.publisher,
        edition: dto.edition,
        category: dto.category,
        language: dto.language,
        location: dto.location,
        totalCopies: dto.totalCopies || 1,
        availableCopies: dto.totalCopies || 1,
        metadata: dto.metadata,
      },
    });
  }

  async findAllBooks(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { author: { contains: query.search, mode: 'insensitive' } },
        { isbn: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.category) where.category = query.category;

    const [items, total] = await Promise.all([
      this.prisma.libraryBook.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.libraryBook.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async issue(tenantId: string, dto: any) {
    const book = await this.prisma.libraryBook.findUnique({ where: { id: dto.bookId } });
    if (!book || book.availableCopies < 1) {
      throw new BusinessException(ErrorCodes.RESOURCE_CONFLICT, 'No available copies', 409);
    }
    await this.prisma.libraryBook.update({
      where: { id: dto.bookId },
      data: { availableCopies: { decrement: 1 } },
    });
    return this.prisma.libraryTransaction.create({
      data: {
        tenantId,
        bookId: dto.bookId,
        userId: dto.userId,
        issueDate: new Date(),
        dueDate: new Date(dto.dueDate),
        issuedById: dto.issuedById,
        status: 'ISSUED',
      },
    });
  }

  async returnBook(tenantId: string, transactionId: string) {
    const tx = await this.prisma.libraryTransaction.findUnique({
      where: { id: transactionId },
    });
    if (!tx) throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Transaction not found', 404);
    await this.prisma.libraryBook.update({
      where: { id: tx.bookId || '' },
      data: { availableCopies: { increment: 1 } },
    });
    const today = new Date();
    const fine = tx.dueDate < today ? 10 * Math.ceil((today.getTime() - tx.dueDate.getTime()) / 86400000) : 0;
    return this.prisma.libraryTransaction.update({
      where: { id: transactionId },
      data: { returnDate: today, status: 'RETURNED', fineAmount: fine },
    });
  }

  async findAllTransactions(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.userId) where.userId = query.userId;
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.libraryTransaction.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { issueDate: 'desc' },
        include: { book: true },
      }),
      this.prisma.libraryTransaction.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async updateBook(tenantId: string, id: string, dto: any) {
    return this.prisma.libraryBook.update({ where: { id }, data: { ...dto } });
  }

  async removeBook(tenantId: string, id: string) {
    await this.prisma.libraryBook.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
