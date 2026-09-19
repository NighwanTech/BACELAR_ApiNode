import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCollegeDto {
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  collegeCode?: string;

  @IsString()
  @IsNotEmpty()
  collegeName: string;

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
  CreatedBy?: string;

  @IsString()
  @IsOptional()
  Remarks?: string;
}
