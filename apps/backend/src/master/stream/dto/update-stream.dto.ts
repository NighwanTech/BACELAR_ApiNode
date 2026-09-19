import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateStreamDto {
  @ApiProperty({ example: 5, required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ example: 'SCIENCE', required: false })
  @IsString()
  @IsOptional()
  streamName?: string;

  @ApiProperty({ example: 'Editor Admin' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
