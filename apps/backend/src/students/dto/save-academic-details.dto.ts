import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsBoolean } from 'class-validator';

export class SaveSubjectDto {
  @ApiProperty({ example: 501, description: 'Subject Master ID' })
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ example: 100, description: 'Max Marks' })
  @IsNumber()
  @IsNotEmpty()
  maxMarks: number;

  @ApiProperty({ example: 33, description: 'Min Marks' })
  @IsNumber()
  @IsNotEmpty()
  minMarks: number;

  @ApiProperty({ example: 85, description: 'Obtained Marks' })
  @IsNumber()
  @IsNotEmpty()
  obtainedMarks: number;

  @ApiProperty({ example: 'A', description: 'Grade', required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ example: 0, description: 'Practical Marks', required: false })
  @IsNumber()
  @IsOptional()
  practicalMarks?: number;

  @ApiProperty({ example: 85, description: 'Theory Marks', required: false })
  @IsNumber()
  @IsOptional()
  theoryMarks?: number;

  @ApiProperty({ example: false, description: 'Is Optional', required: false })
  @IsBoolean()
  @IsOptional()
  isOptional?: boolean;
}

export class SaveQualificationDto {
  @ApiProperty({ example: 1, description: 'Qualification Master ID (e.g. 10th)' })
  @IsInt()
  @IsNotEmpty()
  qualificationId: number;

  @ApiProperty({ example: 1, description: 'Board Master ID (e.g. CBSE)' })
  @IsInt()
  @IsNotEmpty()
  boardId: number;

  @ApiProperty({ example: 'Bhagwan Aadinate College', description: 'School/College Name' })
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty({ example: 2022, description: 'Passing Year' })
  @IsInt()
  @IsNotEmpty()
  passingYear: number;

  @ApiProperty({ example: '123456', description: 'Roll Number' })
  @IsString()
  @IsNotEmpty()
  rollNo: string;

  @ApiProperty({
    example: 'Pass',
    description: 'Result Status: Pass | Appearing | Fail (stored as-is in studentAcademicDetails.resultStatus)',
  })
  @IsString()
  @IsNotEmpty()
  resultStatus: string;

  @ApiProperty({ example: 'Percentage', description: 'Marks Type (Percentage/CGPA)' })
  @IsString()
  @IsNotEmpty()
  marksType: string;

  @ApiProperty({ example: 600, description: 'Max Marks' })
  @IsNumber()
  @IsNotEmpty()
  maxMarks: number;

  @ApiProperty({ example: 500, description: 'Obtained Marks' })
  @IsNumber()
  @IsNotEmpty()
  obtainedMarks: number;

  @ApiProperty({ example: 83.33, description: 'Percentage' })
  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @ApiProperty({ example: 'First', description: 'Division', required: false })
  @IsString()
  @IsOptional()
  division?: string;

  @ApiProperty({ example: 'A', description: 'Grade', required: false })
  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({ type: [SaveSubjectDto], description: 'Subjects list' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveSubjectDto)
  subjects: SaveSubjectDto[];
}

export class SaveAcademicDetailsDto {
  @ApiProperty({ example: 101, description: 'Student ID' })
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({
    example: 5,
    description: 'Selected Program ID (sessionId is auto-assigned from active AcademicSession)',
  })
  @IsInt()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 'Rishi', description: 'Created By' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ type: [SaveQualificationDto], description: 'List of qualifications' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveQualificationDto)
  qualifications: SaveQualificationDto[];
}
