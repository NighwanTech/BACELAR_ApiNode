import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdmissionSessionDto {
  @ApiProperty({ example: '2026-2027', description: 'Name of the admission session' })
  @IsString()
  @IsNotEmpty()
  admissionSessionName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Admission session master entry', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
