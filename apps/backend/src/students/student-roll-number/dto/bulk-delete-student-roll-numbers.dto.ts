import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BulkDeleteStudentRollNumbersDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of roll IDs to delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of deleter' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Incorrect roll number', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
