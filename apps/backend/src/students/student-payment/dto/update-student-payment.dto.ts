import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStudentPaymentDto {
  @ApiProperty({ example: 'SUCCESS', description: 'Payment status (PENDING, SUCCESS, FAILED)', required: false })
  @IsString()
  @IsOptional()
  paymentStatus?: string;

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
