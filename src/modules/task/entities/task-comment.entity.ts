import { ChildEntity, ManyToOne } from 'typeorm';
import { Task }                   from '@modules/task/entities/task.entity';

@ChildEntity()
export class TaskComment extends Comment {
  @ManyToOne(() => Task, task => task.comments)
  task: Task;
}
