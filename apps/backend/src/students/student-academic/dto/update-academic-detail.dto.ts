import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAcademicDetailDto {
  @ApiProperty({ example: 1, description: 'Qualification Master ID', required: false })
  @IsInt()
  @IsOptional()
  qualificationId?: number;

  @ApiProperty({ example: 1, description: 'Board Master ID', required: false })
  @IsInt()
  @IsOptional()
  boardId?: number;

  @ApiProperty({ example: 'Bhagwan Aadinate College', description: 'School/College Name', required: false })
  @IsString()
  @IsOptional()
  schoolName?: string;

  @ApiProperty({ example: 2022, description: 'Passing Year', required: false })
  @IsInt()
  @IsOptional()
  passingYear?: number;

  @ApiProperty({ example: '123456', description: 'Roll Number', required: false })
  @IsString()
  @IsOptional()
  rollNo?: string;

  @ApiProperty({ example: 'Pass', description: 'Result Status', required: false })
  @IsString()
  @IsOptional()
  resultStatus?: string;

  @ApiProperty({ example: 'Percentage', description: 'Marks Type', required: false })
  @IsString()
  @IsOptional()
  marksType?: string;

  @ApiProperty({ example: 600, description: 'Max Marks', required: false })
  @IsNumber()
  @IsOptional()
  maxMarks?: number;

  @ApiProperty({ example: 500, description: 'Obtained Marks', required: false })
  @IsNumber()
  @IsOptional()
  obtainedMarks?: number;

  @ApiProperty({ example: 83.33, description: 'Percentage', required: false })
  @IsNumber()
  @IsOptional()
  percentage?: number;

  @ApiProperty({ example: 'First', description: 'Division', required: false })
  @IsString()
  @IsOptional()
  division?: string;

  @ApiProperty({ example: 'A', description: 'Grade', required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
