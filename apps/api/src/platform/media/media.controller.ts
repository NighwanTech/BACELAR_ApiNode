import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @UploadedFile() file: any,
    @Query('altText') altText?: string,
  ) {
    const data = await this.mediaService.upload(tenantId, userId, file, altText);
    return success(data, 'Media uploaded successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const data = await this.mediaService.findAll(tenantId, { page, limit, search });
    return paginated(data, 'Media retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.mediaService.findById(tenantId, id);
    return success(data, 'Media retrieved');
  }

  @Delete(':id')
  async delete(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.mediaService.delete(tenantId, id);
    return success(data, 'Media deleted successfully');
  }
}
