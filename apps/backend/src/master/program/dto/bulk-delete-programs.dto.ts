import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteProgramsDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of program IDs to delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of deleter' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Bulk delete due to restructuring', description: 'Optional delete remarks', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
