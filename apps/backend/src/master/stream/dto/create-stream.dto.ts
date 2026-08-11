import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateStreamDto {
  @ApiProperty({ example: 5, description: 'Program ID this stream belongs to' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({ example: 'SCIENCE', description: 'Stream name' })
  @IsString()
  @IsNotEmpty()
  streamName: string;

  @ApiProperty({ example: 'Admin User', description: 'Username of creator' })
  @IsString()
  @IsNotEmpty()
  CreatedBy: string;

  @ApiProperty({ example: 'Stream master entry', required: false })
  @IsString()
  @IsOptional()
  Remarks?: string;
}
