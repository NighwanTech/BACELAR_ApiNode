import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaperDetailDto {
  @ApiProperty({ example: 1, description: 'ID of the associated paper type (PaperTypeMaster)', required: false })
  @IsInt()
  @IsOptional()
  paperTypeId?: number;

  @ApiProperty({ example: 1, description: 'ID of the associated exam type (ExamTypeMaster)', required: false })
  @IsInt()
  @IsOptional()
  examTypeId?: number;

  @ApiProperty({ example: 1, description: 'ID of the associated program (Program)', required: false })
  @IsInt()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 1, description: 'ID of the associated year (YearMaster)', required: false })
  @IsInt()
  @IsOptional()
  yearId?: number;

  @ApiProperty({ example: 1, description: 'ID of the associated semester (SemesterMaster)', required: false })
  @IsInt()
  @IsOptional()
  semId?: number;

  @ApiProperty({ example: 'Mathematics', description: 'Subject Name', required: false })
  @IsString()
  @IsOptional()
  subjectName?: string;

  @ApiProperty({ example: 'THEORY', description: 'Paper Type String Name', required: false })
  @IsString()
  @IsOptional()
  paperType?: string;

  @ApiProperty({ example: 'Advanced Calculus', description: 'Paper Name' })
  @IsString()
  @IsNotEmpty()
  paperName: string;

  @ApiProperty({ example: 'MATH101', description: 'Paper Code', required: false })
  @IsString()
  @IsOptional()
  paperCode?: string;

  @ApiProperty({ example: 100, description: 'Total Marks Max', required: false })
  @IsNumber()
  @IsOptional()
  totalMarksMax?: number;

  @ApiProperty({ example: 40, description: 'Total Marks Min', required: false })
  @IsNumber()
  @IsOptional()
  totalMarksMin?: number;

  @ApiProperty({ example: 70, description: 'Theory Marks Max', required: false })
  @IsNumber()
  @IsOptional()
  theoryMarksMax?: number;

  @ApiProperty({ example: 28, description: 'Theory Marks Min', required: false })
  @IsNumber()
  @IsOptional()
  theoryMarksMin?: number;

  @ApiProperty({ example: 30, description: 'Sessional Marks Max', required: false })
  @IsNumber()
  @IsOptional()
  sessionalMarksMax?: number;

  @ApiProperty({ example: 12, description: 'Sessional Marks Min', required: false })
  @IsNumber()
  @IsOptional()
  sessionalMarksMin?: number;

  @ApiProperty({ example: 50, description: 'External Practical Marks Max', required: false })
  @IsNumber()
  @IsOptional()
  externalPracticalMarksMax?: number;

  @ApiProperty({ example: 20, description: 'External Practical Marks Min', required: false })
  @IsNumber()
  @IsOptional()
  externalPracticalMarksMin?: number;

  @ApiProperty({ example: 50, description: 'Internal Practical Marks Max', required: false })
  @IsNumber()
  @IsOptional()
  internalPracticalMarksMax?: number;

  @ApiProperty({ example: 20, description: 'Internal Practical Marks Min', required: false })
  @IsNumber()
  @IsOptional()
  internalPracticalMarksMin?: number;

  @ApiProperty({ example: 20, description: 'Viva Marks Max', required: false })
  @IsNumber()
  @IsOptional()
  vivaMarksMax?: number;

  @ApiProperty({ example: 8, description: 'Viva Marks Min', required: false })
  @IsNumber()
  @IsOptional()
  vivaMarksMin?: number;

  @ApiProperty({ example: 100, description: 'Project Max Marks', required: false })
  @IsNumber()
  @IsOptional()
  projectMax?: number;

  @ApiProperty({ example: 40, description: 'Project Min Marks', required: false })
  @IsNumber()
  @IsOptional()
  projectMin?: number;

  @ApiProperty({ example: 4, description: 'Credit Max', required: false })
  @IsNumber()
  @IsOptional()
  creditMax?: number;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Paper detail entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
