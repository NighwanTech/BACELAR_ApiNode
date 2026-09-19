import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentPaymentDto {
  @ApiProperty({ example: 'SUCCESS', description: 'Payment status (PENDING, SUCCESS, FAILED)', required: false })
  @IsString()
  @IsOptional()
  paymentStatus?: string;

  @ApiProperty({ example: 500, description: 'Amount paid', required: false })
  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @ApiProperty({ example: 'REGISTRATION', description: 'Fee type', required: false })
  @IsString()
  @IsOptional()
  feeType?: string;

  @ApiProperty({ example: 1, description: 'Fee type master ID', required: false })
  @IsNumber()
  @IsOptional()
  feeTypeId?: number;

  @ApiProperty({ example: 'order_abc123', description: 'Merchant Order ID', required: false })
  @IsString()
  @IsOptional()
  merchantOrderId?: string;

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

  @ApiProperty({ example: 'RRN123456', description: 'Bank RRN / acquirer reference', required: false })
  @IsString()
  @IsOptional()
  bankRrnNo?: string;

  @ApiProperty({ example: 'ENR/2026/001', description: 'Enrollment number snapshot', required: false })
  @IsString()
  @IsOptional()
  enrollNo?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Payment status updated to success', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
