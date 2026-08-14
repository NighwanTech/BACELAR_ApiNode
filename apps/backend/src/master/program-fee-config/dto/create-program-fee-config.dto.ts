import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgramFeeConfigDto {
  @ApiProperty({ example: 5, description: 'Program ID' })
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 1, description: 'Admission Session ID' })
  @IsNumber()
  @IsNotEmpty()
  admissionSessionId: number;

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

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'BCA Fee 2026-27 config', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
