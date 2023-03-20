import { ChildEntity, ManyToOne } from 'typeorm';
import { Subtask }                from '@modules/subtask/entities/subtask.entity';

@ChildEntity()
export class SubtaskComment extends Comment {
  @ManyToOne(() => Subtask, subtask => subtask.comments)
  subtask: Subtask;
}
