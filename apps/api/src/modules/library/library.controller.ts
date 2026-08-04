import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('books')
  async addBook(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.libraryService.addBook(tenantId, dto);
    return success(data, 'Book added successfully');
  }

  @Get('books')
  async findAllBooks(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    const data = await this.libraryService.findAllBooks(tenantId, { page, limit, search, category });
    return paginated(data, 'Books retrieved');
  }

  @Patch('books/:id')
  async updateBook(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.libraryService.updateBook(tenantId, id, dto);
    return success(data, 'Book updated successfully');
  }

  @Delete('books/:id')
  async removeBook(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.libraryService.removeBook(tenantId, id);
    return success(data, 'Book removed successfully');
  }

  @Post('transactions/issue')
  async issue(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.libraryService.issue(tenantId, dto);
    return success(data, 'Book issued successfully');
  }

  @Post('transactions/:id/return')
  async returnBook(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.libraryService.returnBook(tenantId, id);
    return success(data, 'Book returned successfully');
  }

  @Get('transactions')
  async findAllTransactions(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('userId') userId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.libraryService.findAllTransactions(tenantId, { page, limit, userId, status });
    return paginated(data, 'Transactions retrieved');
  }
}
