import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteRolesDto {
  @ApiProperty({ example: [1, 2, 3] })
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
