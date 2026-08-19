import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class TestimonialService {
  constructor(private readonly prisma: PrismaService) {}

  private get testimonial() {
    return (this.prisma as any).testimonial;
  }

  async create(data: any) {
    return this.testimonial.create({
      data: {
        name: data.name,
        role: data.role || null,
        message: data.message || null,
        rating: data.rating !== undefined ? data.rating : 5.0,
        image: data.image || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.testimonial.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { testimonialId: 'desc' }],
    });
  }

  async findOne(testimonialId: number) {
    const item = await this.testimonial.findFirst({
      where: { testimonialId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Testimonial entry with ID ${testimonialId} not found`);
    }
    return item;
  }

  async update(testimonialId: number, data: any) {
    await this.findOne(testimonialId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.role !== undefined) updatePayload.role = data.role;
    if (data.message !== undefined) updatePayload.message = data.message;
    if (data.rating !== undefined) updatePayload.rating = data.rating;
    if (data.image !== undefined) updatePayload.image = data.image;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return this.testimonial.update({
      where: { testimonialId },
      data: updatePayload,
    });
  }

  
  async updateStatus(testimonialId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(testimonialId, { IsActive, UpdatedBy });
  }

  async softDelete(testimonialId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(testimonialId);

    return this.testimonial.update({
      where: { testimonialId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
