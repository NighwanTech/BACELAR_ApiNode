import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePramanResponseDto {
  @ApiProperty({ example: 'APPROVED', description: 'Name of the praman response', required: false })
  @IsString()
  @IsOptional()
  pramanResponseName?: string;

  @ApiProperty({ example: 'Editor Admin', description: 'Username of editor' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, description: 'Is praman response active?', required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ example: 'Updated praman response details', description: 'Optional remarks', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
