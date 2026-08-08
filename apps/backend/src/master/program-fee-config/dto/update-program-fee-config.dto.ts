import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProgramFeeConfigDto {
  @ApiProperty({ example: 5, description: 'Program ID', required: false })
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 1, description: 'Academic Session ID', required: false })
  @IsNumber()
  @IsOptional()
  sessionId?: number;

  @ApiProperty({ example: 1000.00, description: 'Registration Base Fee', required: false })
  @IsNumber()
  @IsOptional()
  registrationBaseFee?: number;

  @ApiProperty({ example: 2.00, description: 'Registration Payment Gateway Rate Percentage', required: false })
  @IsNumber()
  @IsOptional()
  registrationPgRate?: number;

  @ApiProperty({ example: 18.00, description: 'Registration GST Rate Percentage', required: false })
  @IsNumber()
  @IsOptional()
  registrationGstRate?: number;

  @ApiProperty({ example: 1375.00, description: 'Examination Base Fee', required: false })
  @IsNumber()
  @IsOptional()
  examinationBaseFee?: number;

  @ApiProperty({ example: 2.00, description: 'Examination Payment Gateway Rate Percentage', required: false })
  @IsNumber()
  @IsOptional()
  examinationPgRate?: number;

  @ApiProperty({ example: 18.00, description: 'Examination GST Rate Percentage', required: false })
  @IsNumber()
  @IsOptional()
  examinationGstRate?: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'BCA Fee 2026-27 update', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
