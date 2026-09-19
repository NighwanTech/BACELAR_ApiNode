import { PartialType } from '@nestjs/swagger';
import { CreateExamTypeDto } from './create-exam-type.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateExamTypeDto extends PartialType(CreateExamTypeDto) {
  @ApiProperty({ example: 'Admin User', description: 'Username of modifier', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: true, description: 'Is active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
