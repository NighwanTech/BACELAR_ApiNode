import { PartialType } from '@nestjs/swagger';
import { CreateEntrancePaperDto } from './create-entrance-paper.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEntrancePaperDto extends PartialType(CreateEntrancePaperDto) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
