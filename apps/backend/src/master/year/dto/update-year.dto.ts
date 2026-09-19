import { PartialType } from '@nestjs/swagger';
import { CreateYearDto } from './create-year.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateYearDto extends PartialType(CreateYearDto) {
  @ApiProperty({ example: 'Admin User', description: 'Username of modifier', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: true, description: 'Is active status', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
