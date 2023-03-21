import { Module }            from '@nestjs/common';
import { SubtaskService }    from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { Subtask }           from '@modules/subtask/entities/subtask.entity';
import { SubtaskComment }    from '@modules/subtask/entities/subtask-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subtask, SubtaskComment])
  ],
  controllers: [SubtaskController],
  providers: [SubtaskService]
})
export class SubtaskModule {}
