import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommitteeDto {
  @ApiProperty({ example: 'Academic Council Committee', description: 'Name of committee', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'https://example.com/committees/academic-council', description: 'Committee Page / Document URL', required: false })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({ example: 1, description: 'Display priority order', required: false })
  @IsInt()
  @IsOptional()
  priorityOrder?: number;

  @ApiProperty({ example: true, description: 'Is committee active on website?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: 'Updated committee description', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
