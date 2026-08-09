import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';

@ApiTags('Website - Hero Sections')
@Controller('website/hero-sections')
export class HeroSectionController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hero section entry' })
  @ApiResponse({ status: 201, description: 'Hero section entry created successfully' })
  create(@Body() createDto: CreateHeroSectionDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_hero_section' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active hero sections (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all hero sections' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_hero_sections' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hero section details by heroSectionId' })
  @ApiResponse({ status: 200, description: 'Return hero section details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_hero_section' }, { heroSectionId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update hero section details by heroSectionId' })
  @ApiResponse({ status: 200, description: 'Hero section updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHeroSectionDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_hero_section' },
      { heroSectionId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a hero section entry by heroSectionId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete hero banner' })
  @ApiResponse({ status: 200, description: 'Hero section soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_hero_section' },
      { heroSectionId: id, DeletedBy, DeletedRemarks },
    );
  }
}
