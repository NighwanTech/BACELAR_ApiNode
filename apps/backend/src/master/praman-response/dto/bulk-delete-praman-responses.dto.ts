import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeletePramanResponsesDto {
  @ApiProperty({ example: [1, 2, 3], description: 'Array of pramanResponse IDs to soft delete' })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  ids: number[];

  @ApiProperty({ example: 'Admin User', description: 'Username of user deleting records' })
  @IsString()
  @IsNotEmpty()
  DeletedBy: string;

  @ApiProperty({ example: 'Obsolete praman responses', description: 'Optional deletion remarks', required: false })
  @IsString()
  @IsOptional()
  DeletedRemarks?: string;
}
