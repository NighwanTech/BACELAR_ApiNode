import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({ example: true, description: 'Active / Inactive flag' })
  @IsDefined()
  @IsBoolean()
  IsActive: boolean;

  @ApiProperty({ example: 'Admin User', description: 'User updating the status' })
  @IsString()
  @IsNotEmpty()
  UpdatedBy: string;
}
