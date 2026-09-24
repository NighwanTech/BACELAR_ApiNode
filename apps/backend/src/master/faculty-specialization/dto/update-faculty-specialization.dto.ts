import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFacultySpecializationDto {
  @ApiProperty({ example: 'Assistant Professor', description: 'Name of the faculty specialization', required: false })
  @IsString()
  @IsOptional()
  specializationName?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Faculty Specialization update', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
