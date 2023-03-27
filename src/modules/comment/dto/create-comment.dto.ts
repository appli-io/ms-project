import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  content: string;

  @IsOptional()
  @IsUUID()
  parent?: string;

  @IsUUID()
  @IsNotEmpty()
  author: string;
}
