import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BulkDeleteAcademicDetailsDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of academic detail IDs to delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of deleter' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Bulk delete qualifications', description: 'Optional delete remarks', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
