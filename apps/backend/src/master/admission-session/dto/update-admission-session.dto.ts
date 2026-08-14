import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdmissionSessionDto {
  @ApiProperty({ example: '2026-2027', description: 'Name of the admission session', required: false })
  @IsString()
  @IsOptional()
  admissionSessionName?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of last editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status of the session', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
