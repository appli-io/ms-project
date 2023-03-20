import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {

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
  dateStart: Date;

  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsDate()
  completedDate: Date;

  @Matches(/^[^\s]+$/, {
    message: 'El contenido debe ser una sola palabra sin espacios.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  prefix: string;

  @IsOptional()
  @IsUrl()
  referenceUrl: string;
}
