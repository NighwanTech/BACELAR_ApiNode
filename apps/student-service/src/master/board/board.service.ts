import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.boardMaster.create({
      data: {
        boardName: data.boardName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.boardMaster.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { boardName: 'asc' },
    });
  }

  async findOne(boardId: number) {
    const board = await this.prisma.boardMaster.findFirst({
      where: { boardId, IsDeleted: false },
    });
    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }
    return board;
  }

  async update(boardId: number, data: any) {
    await this.findOne(boardId);

    return this.prisma.boardMaster.update({
      where: { boardId },
      data: {
        boardName: data.boardName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(boardId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(boardId);
    return this.prisma.boardMaster.update({
      where: { boardId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(boardId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(boardId);

    return this.prisma.boardMaster.update({
      where: { boardId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.boardMaster.updateMany({
      where: {
        boardId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} board(s)`,
      count: result.count,
    };
  }
}
