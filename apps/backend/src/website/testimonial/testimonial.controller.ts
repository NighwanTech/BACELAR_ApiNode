import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@ApiTags('Website - Testimonials')
@Controller('website/testimonials')
export class TestimonialController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new testimonial entry' })
  @ApiResponse({ status: 201, description: 'Testimonial created successfully' })
  create(@Body() createDto: CreateTestimonialDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_testimonial' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active testimonials (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all testimonials' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_testimonials' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial details by testimonialId' })
  @ApiResponse({ status: 200, description: 'Return testimonial details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_testimonial' }, { testimonialId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update testimonial details by testimonialId' })
  @ApiResponse({ status: 200, description: 'Testimonial updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTestimonialDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_testimonial' },
      { testimonialId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a testimonial entry by testimonialId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete testimonial' })
  @ApiResponse({ status: 200, description: 'Testimonial soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_testimonial' },
      { testimonialId: id, DeletedBy, DeletedRemarks },
    );
  }
}
