import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQualificationDto {
  @ApiProperty({ example: '10th', description: 'Name of the qualification level', required: false })
  @IsString()
  @IsOptional()
  qualificationName?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Qualification edit', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
