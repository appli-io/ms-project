import { ChildEntity, ManyToOne } from 'typeorm';
import { Comment }                from '@modules/comment/entities/comment.entity';
import { Epic }                   from '@modules/epic/entities/epic.entity';

@ChildEntity()
export class EpicComment extends Comment {
  @ManyToOne(() => Epic, epic => epic.comments)
  epic: Epic;
}
