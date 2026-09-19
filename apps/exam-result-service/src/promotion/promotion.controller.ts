import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PromotionService } from './promotion.service';

@Controller()
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @MessagePattern({ cmd: 'search_promotion_candidates' })
  async search(@Payload() data: any) {
    try {
      return await this.promotionService.searchCandidates(data || {});
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'save_promotion' })
  async save(@Payload() data: any) {
    try {
      return await this.promotionService.save(data);
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'find_all_promotions' })
  async findAll(@Payload() data?: any) {
    try {
      return await this.promotionService.findAll(data || {});
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }

  @MessagePattern({ cmd: 'find_one_promotion' })
  async findOne(@Payload() data: { promotionId: number }) {
    try {
      return await this.promotionService.findOne(data.promotionId);
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 404,
      };
    }
  }

  @MessagePattern({ cmd: 'delete_promotion' })
  async softDelete(
    @Payload() data: { promotionId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.promotionService.softDelete(
        data.promotionId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Unknown error',
        statusCode: error.status || error.statusCode || 400,
      };
    }
  }
}
