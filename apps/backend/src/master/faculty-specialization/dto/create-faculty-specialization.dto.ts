import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultySpecializationDto {
  @ApiProperty({ example: 'Assistant Professor', description: 'Name of the faculty specialization' })
  @IsString()
  @IsNotEmpty()
  specializationName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Faculty designation', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
