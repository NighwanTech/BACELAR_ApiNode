import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCollegeDto {
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  collegeCode?: string;

  @IsString()
  @IsOptional()
  collegeName?: string;

  @IsString()
  @IsOptional()
  shortName?: string;

  @IsString()
  @IsOptional()
  collegeAddress?: string;

  @IsString()
  @IsOptional()
  primaryContactNumber?: string;

  @IsString()
  @IsOptional()
  alternateContactNumber?: string;

  @IsString()
  @IsOptional()
  emailId?: string;

  @IsString()
  @IsOptional()
  collegeWebsite?: string;

  @IsString()
  @IsOptional()
  UpdatedBy?: string;

  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;

  @IsString()
  @IsOptional()
  Remarks?: string;
}
