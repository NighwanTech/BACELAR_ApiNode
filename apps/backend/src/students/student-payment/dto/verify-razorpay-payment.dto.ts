import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyRazorpayPaymentDto {
  @ApiProperty({ example: 1, description: 'Local payment record ID' })
  @IsNumber()
  @IsNotEmpty()
  paymentId: number;

  @ApiProperty({ example: 'order_M51j29hJ12' })
  @IsString()
  @IsNotEmpty()
  razorpayOrderId: string;

  @ApiProperty({ example: 'pay_M51jL91n18' })
  @IsString()
  @IsNotEmpty()
  razorpayPaymentId: string;

  @ApiProperty({ example: 'abcde12345signature' })
  @IsString()
  @IsNotEmpty()
  razorpaySignature: string;

  @ApiProperty({ example: 'Student Portal', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  gatewayResponse?: string;
}
