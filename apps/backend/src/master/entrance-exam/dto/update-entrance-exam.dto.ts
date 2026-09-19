import { PartialType } from '@nestjs/swagger';
import { CreateEntranceExamDto } from './create-entrance-exam.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEntranceExamDto extends PartialType(CreateEntranceExamDto) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
