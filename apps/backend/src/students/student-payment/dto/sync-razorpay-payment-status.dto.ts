import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SyncRazorpayPaymentStatusDto {
  @ApiProperty({ example: 1, description: 'Student registration ID' })
  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({
    example: 'REGISTRATION',
    description: 'Fee type (REGISTRATION or EXAMINATION)',
    required: false,
  })
  @IsString()
  @IsOptional()
  feeType?: string;

  @ApiProperty({ example: 'Student Portal', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;
}
