import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStatsCounterDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  suffix?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @IsInt()
  @IsOptional()
  displayOrder?: number;

  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @IsString()
  @IsOptional()
  Remarks?: string;
}
