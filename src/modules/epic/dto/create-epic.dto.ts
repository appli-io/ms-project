import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateEpicDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  dateStart?: Date;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  dateEnd?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  prefix: string;

  @IsOptional()
  @IsUrl()
  referenceUrl?: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
