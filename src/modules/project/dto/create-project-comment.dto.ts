import { PartialType }      from '@nestjs/swagger';
import { CreateCommentDto } from '@modules/comment/dto/create-comment.dto';

export class CreateProjectCommentDto extends PartialType(CreateCommentDto) {}
