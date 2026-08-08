import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ example: 'MATHEMATICS', description: 'Name of the subject' })
  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @ApiProperty({ example: 'MATH', description: 'Short code of the subject' })
  @IsString()
  @IsNotEmpty()
  subjectCode: string;

  @ApiProperty({ example: '12TH', description: 'Class type standard: 10TH, 12TH or BOTH' })
  @IsString()
  @IsIn(['10TH', '12TH', 'BOTH'])
  @IsNotEmpty()
  classType: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Core subject entry', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
