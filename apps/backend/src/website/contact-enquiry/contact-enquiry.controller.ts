import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateContactEnquiryDto } from './dto/create-contact-enquiry.dto';
import { UpdateContactEnquiryDto } from './dto/update-contact-enquiry.dto';

@ApiTags('Website - Contact Enquiries')
@Controller('website/contact-enquiries')
export class ContactEnquiryController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit / Create a new contact enquiry' })
  @ApiResponse({ status: 201, description: 'Contact enquiry created successfully' })
  create(@Body() createDto: CreateContactEnquiryDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_contact_enquiry' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active contact enquiries (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all contact enquiries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_contact_enquiries' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact enquiry details by contactEnquiryId' })
  @ApiResponse({ status: 200, description: 'Return contact enquiry details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_contact_enquiry' }, { contactEnquiryId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update contact enquiry details by contactEnquiryId' })
  @ApiResponse({ status: 200, description: 'Contact enquiry updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateContactEnquiryDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_contact_enquiry' },
      { contactEnquiryId: id, ...updateDto },
    );
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_contact_enquiry' },
      { contactEnquiryId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a contact enquiry entry by contactEnquiryId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Spam entry' })
  @ApiResponse({ status: 200, description: 'Contact enquiry soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_contact_enquiry' },
      { contactEnquiryId: id, DeletedBy, DeletedRemarks },
    );
  }
}
