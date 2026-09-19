import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommitteeSubmenuDto {
  @ApiProperty({ example: 1, description: 'Parent Committee ID', required: false })
  @IsInt()
  @IsOptional()
  committeeId?: number;

  @ApiProperty({ example: 'Composition of Committee', description: 'Name of submenu item', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'https://example.com/committees/composition.pdf', description: 'Submenu Document / Page URL', required: false })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({ example: 1, description: 'Display priority order', required: false })
  @IsInt()
  @IsOptional()
  priorityOrder?: number;

  @ApiProperty({ example: true, description: 'Is submenu active on website?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Admin User', description: 'Username of updater', required: false })
  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @ApiProperty({ example: 'Updated submenu details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
