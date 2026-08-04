import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CmsService } from './cms.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post('pages')
  async createPage(@Tenant('id') tenantId: string, @CurrentUser('id') userId: string, @Body() dto: any) {
    const data = await this.cmsService.createPage(tenantId, dto, userId);
    return success(data, 'Page created successfully');
  }

  @Get('pages')
  async findAllPages(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.cmsService.findAllPages(tenantId, { page, limit, status, search });
    return paginated(data, 'Pages retrieved');
  }

  @Get('pages/slug/:slug')
  async findPageBySlug(@Tenant('id') tenantId: string, @Param('slug') slug: string) {
    const data = await this.cmsService.findPageBySlug(tenantId, slug);
    return success(data, 'Page retrieved');
  }

  @Patch('pages/:id')
  async updatePage(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.cmsService.updatePage(tenantId, id, dto);
    return success(data, 'Page updated successfully');
  }

  @Post('pages/:id/publish')
  async publishPage(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.cmsService.publishPage(tenantId, id);
    return success(data, 'Page published successfully');
  }

  @Delete('pages/:id')
  async removePage(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.cmsService.removePage(tenantId, id);
    return success(data, 'Page removed successfully');
  }

  @Post('posts')
  async createPost(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.cmsService.createPost(tenantId, dto);
    return success(data, 'Post created successfully');
  }

  @Get('posts')
  async findAllPosts(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.cmsService.findAllPosts(tenantId, { page, limit, status, category, search });
    return paginated(data, 'Posts retrieved');
  }

  @Patch('posts/:id')
  async updatePost(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.cmsService.updatePost(tenantId, id, dto);
    return success(data, 'Post updated successfully');
  }

  @Post('posts/:id/publish')
  async publishPost(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.cmsService.publishPost(tenantId, id);
    return success(data, 'Post published successfully');
  }

  @Delete('posts/:id')
  async removePost(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.cmsService.removePost(tenantId, id);
    return success(data, 'Post removed successfully');
  }
}
