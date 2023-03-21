import { Module }         from '@nestjs/common';
import { TaskService }    from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { Task }           from '@modules/task/entities/task.entity';
import { TaskComment }    from '@modules/task/entities/task-comment.entity';
import { Comment }        from '@modules/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Comment, TaskComment])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
