import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteProfilesDto {
  @ApiProperty({ example: [1, 2, 3], description: 'List of studentProfileId values to delete' })
  @IsArray()
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of deleter' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Incorrect entries', description: 'Optional remarks for deletion', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
