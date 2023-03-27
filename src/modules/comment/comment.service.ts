import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { CreateCommentDto } from '@modules/comment/dto/create-comment.dto';
import { Comment }          from '@modules/comment/entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create(createCommentDto: CreateCommentDto) { }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${ id } comment`;
  }

  update(id: number) {
    return `This action updates a #${ id } comment`;
  }

  remove(id: number) {
    return `This action removes a #${ id } comment`;
  }
}
