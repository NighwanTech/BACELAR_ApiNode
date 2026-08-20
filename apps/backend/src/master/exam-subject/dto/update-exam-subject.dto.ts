import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateExamSubjectDto } from './create-exam-subject.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateExamSubjectDto extends PartialType(CreateExamSubjectDto) {
  @ApiProperty({ example: 'Admin User', description: 'Username of modifier', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: true, description: 'Is active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
