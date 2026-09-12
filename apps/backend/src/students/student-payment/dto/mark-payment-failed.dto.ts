import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MarkPaymentFailedDto {
  @ApiProperty({ example: 1, description: 'Student payment ID' })
  @IsNumber()
  @IsNotEmpty()
  paymentId: number;

  @ApiProperty({
    example: 'Payment failed at bank authentication',
    description: 'Human-readable failure reason (stored in Remarks)',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 'RAZORPAY', description: 'Gateway name', required: false })
  @IsString()
  @IsOptional()
  gateway?: string;

  @ApiProperty({ example: '{}', description: 'Raw gateway error payload', required: false })
  @IsString()
  @IsOptional()
  gatewayResponse?: string;

  @ApiProperty({ example: 'Student Portal', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;
}
