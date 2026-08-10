import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStudentPaymentDto } from './dto/create-student-payment.dto';
import { CreateRazorpayOrderDto } from './dto/create-razorpay-order.dto';
import { VerifyRazorpayPaymentDto } from './dto/verify-razorpay-payment.dto';
import { UpdateStudentPaymentDto } from './dto/update-student-payment.dto';
import { BulkDeleteStudentPaymentsDto } from './dto/bulk-delete-student-payments.dto';

@ApiTags('Student - Payments')
@Controller('students-payments')
export class StudentPaymentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student payment record (Razorpay order details, etc.)' })
  @ApiResponse({ status: 201, description: 'Payment record created successfully' })
  create(@Body() createDto: CreateStudentPaymentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_student_payment' }, createDto);
  }

  @Post('create-order')
  @ApiOperation({ summary: 'Create Razorpay order + PENDING payment from programFeeConfig' })
  @ApiResponse({ status: 201, description: 'Razorpay order created successfully' })
  createOrder(@Body() createDto: CreateRazorpayOrderDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_razorpay_order' }, createDto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify Razorpay payment signature and mark SUCCESS' })
  @ApiResponse({ status: 200, description: 'Payment verified successfully' })
  verify(@Body() verifyDto: VerifyRazorpayPaymentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'verify_razorpay_payment' }, verifyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all student payment records' })
  @ApiResponse({ status: 200, description: 'Return all payments' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_student_payments' }, {});
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all payment records for a specific Student Registration ID' })
  @ApiResponse({ status: 200, description: 'Return student payments' })
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_student_payments_by_student' }, { studentId });
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get payment record by Razorpay Order ID' })
  @ApiResponse({ status: 200, description: 'Return payment details' })
  findByOrderId(@Param('orderId') orderId: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_student_payment_by_order_id' }, { razorpayOrderId: orderId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment details by ID' })
  @ApiResponse({ status: 200, description: 'Return payment details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_student_payment' }, { paymentId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payment record (Update status, Razorpay Transaction ID, signature)' })
  @ApiResponse({ status: 200, description: 'Payment record updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateStudentPaymentDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_student_payment' }, { paymentId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete payment record by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Correction entry' })
  @ApiResponse({ status: 200, description: 'Payment record soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_student_payment' },
      { paymentId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple payment records' })
  @ApiResponse({ status: 200, description: 'Payment records bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteStudentPaymentsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_student_payments' }, bulkDeleteDto);
  }
}
