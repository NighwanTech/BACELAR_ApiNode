import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentPaymentDto {
  @ApiProperty({ example: 1, description: 'ID of the Student registration' })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 'REGISTRATION', description: 'Fee Type (REGISTRATION or EXAMINATION)' })
  @IsString()
  @IsNotEmpty()
  feeType: string;

  @ApiProperty({ example: 1023.60, description: 'Amount paid' })
  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @ApiProperty({ example: 'PENDING', description: 'Payment status (PENDING, SUCCESS, FAILED)', required: false })
  @IsString()
  @IsOptional()
  paymentStatus?: string;

  @ApiProperty({ example: 'order_M51j29hJ12', description: 'Razorpay Order ID', required: false })
  @IsString()
  @IsOptional()
  razorpayOrderId?: string;

  @ApiProperty({ example: 'pay_M51jL91n18', description: 'Razorpay Payment ID', required: false })
  @IsString()
  @IsOptional()
  razorpayPaymentId?: string;

  @ApiProperty({ example: 'abcde12345signature', description: 'Razorpay Signature Hash', required: false })
  @IsString()
  @IsOptional()
  razorpaySignature?: string;

  @ApiProperty({ example: '{}', description: 'Raw Gateway response payload', required: false })
  @IsString()
  @IsOptional()
  gatewayResponse?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Payment initiated via UPI', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
