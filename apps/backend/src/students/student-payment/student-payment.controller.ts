import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStudentPaymentDto } from './dto/create-student-payment.dto';
import { CreateRazorpayOrderDto } from './dto/create-razorpay-order.dto';
import { CreateIciciCheckoutDto } from './dto/create-icici-checkout.dto';
import { MarkPaymentFailedDto } from './dto/mark-payment-failed.dto';
import { SyncRazorpayPaymentStatusDto } from './dto/sync-razorpay-payment-status.dto';
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

  @Post('create-icici-checkout')
  @ApiOperation({
    summary: 'Create PENDING payment + ICICI redirect URL (from API ICICI_PAYMENT_URL)',
  })
  @ApiResponse({ status: 201, description: 'ICICI checkout created successfully' })
  createIciciCheckout(@Body() createDto: CreateIciciCheckoutDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_icici_checkout' }, createDto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify Razorpay payment signature and mark SUCCESS' })
  @ApiResponse({ status: 200, description: 'Payment verified successfully' })
  verify(@Body() verifyDto: VerifyRazorpayPaymentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'verify_razorpay_payment' }, verifyDto);
  }

  @Post('mark-failed')
  @ApiOperation({ summary: 'Mark payment as FAILED and save failure reason' })
  @ApiResponse({ status: 200, description: 'Payment marked as failed' })
  markFailed(@Body() dto: MarkPaymentFailedDto): Observable<any> {
    return this.studentClient.send({ cmd: 'mark_payment_failed' }, dto);
  }

  @Post('sync-razorpay-status')
  @ApiOperation({
    summary:
      'Re-check Razorpay for pending/failed payment (money deducted but site not updated)',
  })
  @ApiResponse({ status: 200, description: 'Sync result with payment status' })
  syncRazorpayStatus(@Body() dto: SyncRazorpayPaymentStatusDto): Observable<any> {
    return this.studentClient.send({ cmd: 'sync_razorpay_payment_status' }, dto);
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
