import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

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

  @IsDate()
  @IsNotEmpty()
  dateStart: Date;

  @IsDate()
  @IsNotEmpty()
  dateEnd: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  referenceCode: string;


  @IsUUID()
  @IsNotEmpty()
  project: string;
}
