import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAdmissionEnquiryDto } from './dto/create-admission-enquiry.dto';
import { UpdateAdmissionEnquiryDto } from './dto/update-admission-enquiry.dto';

@ApiTags('Website - Admission Enquiries')
@Controller('website/admission-enquiries')
export class AdmissionEnquiryController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit / Create a new admission enquiry' })
  @ApiResponse({ status: 201, description: 'Admission enquiry created successfully' })
  create(@Body() createDto: CreateAdmissionEnquiryDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_admission_enquiry' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active admission enquiries (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all admission enquiries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_admission_enquiries' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admission enquiry details by admissionEnquiryId' })
  @ApiResponse({ status: 200, description: 'Return admission enquiry details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_admission_enquiry' }, { admissionEnquiryId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admission enquiry details by admissionEnquiryId' })
  @ApiResponse({ status: 200, description: 'Admission enquiry updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAdmissionEnquiryDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_admission_enquiry' },
      { admissionEnquiryId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an admission enquiry by admissionEnquiryId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Duplicate entry' })
  @ApiResponse({ status: 200, description: 'Admission enquiry soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_admission_enquiry' },
      { admissionEnquiryId: id, DeletedBy, DeletedRemarks },
    );
  }
}
