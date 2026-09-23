import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteFacultiesDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of faculty IDs to delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
