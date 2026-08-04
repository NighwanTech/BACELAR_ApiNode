import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('API Keys')
@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  async create(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateApiKeyDto,
  ) {
    const data = await this.apiKeyService.create(tenantId, userId, dto);
    return success(data, 'API key created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const data = await this.apiKeyService.findAll(tenantId, { page, limit });
    return paginated(data, 'API keys retrieved');
  }

  @Delete(':id')
  async revoke(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.apiKeyService.revoke(tenantId, id);
    return success(data, 'API key revoked successfully');
  }
}
