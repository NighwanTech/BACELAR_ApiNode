import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BulkDeleteAdminLoginsDto {
  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Super Admin' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
