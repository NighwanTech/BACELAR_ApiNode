import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommitteeSubmenuDto {
  @ApiProperty({ example: 1, description: 'Parent Committee ID' })
  @IsInt()
  @IsNotEmpty()
  committeeId: number;

  @ApiProperty({ example: 'Composition of Committee', description: 'Name of submenu item' })
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @ApiProperty({ example: 'Admin User', description: 'Username of creator', required: false })
  @IsString()
  @IsOptional()
  CreatedBy?: string;

  @ApiProperty({ example: 'Committee composition details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
