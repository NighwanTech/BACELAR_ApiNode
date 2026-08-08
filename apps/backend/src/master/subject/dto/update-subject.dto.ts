import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto {
  @ApiProperty({ example: 'MATHEMATICS', description: 'Name of the subject', required: false })
  @IsString()
  @IsOptional()
  subjectName?: string;

  @ApiProperty({ example: 'MATH', description: 'Short code of the subject', required: false })
  @IsString()
  @IsOptional()
  subjectCode?: string;

  @ApiProperty({ example: '12TH', description: 'Class type standard: 10TH, 12TH or BOTH', required: false })
  @IsString()
  @IsIn(['10TH', '12TH', 'BOTH'])
  @IsOptional()
  classType?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is subject active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated subject remarks', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
