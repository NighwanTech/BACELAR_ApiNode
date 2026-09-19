import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HeroSectionService } from './hero-section.service';

@Controller()
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) {}

  @MessagePattern({ cmd: 'create_hero_section' })
  async create(@Payload() data: any) {
    try {
      return await this.heroSectionService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_hero_sections' })
  async findAll() {
    try {
      return await this.heroSectionService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_hero_section' })
  async findOne(@Payload() data: { heroSectionId: number }) {
    try {
      return await this.heroSectionService.findOne(data.heroSectionId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_hero_section' })
  async update(@Payload() data: any) {
    try {
      const { heroSectionId, ...updateData } = data;
      return await this.heroSectionService.update(heroSectionId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_hero_section' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.heroSectionService.updateStatus(
        data.heroSectionId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_hero_section' })
  async softDelete(
    @Payload() data: { heroSectionId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.heroSectionService.softDelete(
        data.heroSectionId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
