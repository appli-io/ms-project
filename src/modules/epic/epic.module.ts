import { Module }         from '@nestjs/common';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { Epic }           from '@modules/epic/entities/epic.entity';
import { EpicComment }    from '@modules/epic/entities/epic-comment.entity';
import { Comment }        from '@modules/comment/entities/comment.entity';
import { EpicService }    from './epic.service';
import { EpicController } from './epic.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Epic, Comment, EpicComment])
  ],
  controllers: [EpicController],
  providers: [EpicService]
})
export class EpicModule {}
