import { Module }            from '@nestjs/common';
import { CommentService }    from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { Comment }           from '@modules/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment])
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [
    TypeOrmModule
  ]
})
export class CommentModule {}
