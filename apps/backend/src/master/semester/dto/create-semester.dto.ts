import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSemesterDto {
  @ApiProperty({ example: 1, description: 'ID of the associated year (YearMaster)', required: false })
  @IsInt()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ example: '1st Semester', description: 'Name of the semester' })
  @IsString()
  @IsNotEmpty()
  semesterName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Semester master entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
