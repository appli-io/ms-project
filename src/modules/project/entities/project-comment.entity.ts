import { ChildEntity, ManyToOne } from 'typeorm';
import { Comment }                from '@modules/comment/entities/comment.entity';
import { Project }                from '@modules/project/entities/project.entity';

@ChildEntity('projectComments')
export class ProjectComment extends Comment {
  @ManyToOne(() => Project, project => project.comments)
  project: Project;
}
