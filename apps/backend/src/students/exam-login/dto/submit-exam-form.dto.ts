import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';

export class SubmitExamFormDto {
  @ApiProperty({ example: [1491, 1492, 1493], description: 'Array of chosen Paper IDs' })
  @IsNotEmpty()
  @IsArray()
  selectedPapers: number[];

  @ApiProperty({ example: true, description: 'Declaration accepted status' })
  @IsNotEmpty()
  @IsBoolean()
  declarationAccepted: boolean;
}
