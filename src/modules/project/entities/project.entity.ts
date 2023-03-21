import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
}                         from 'typeorm';
import { Epic }           from '@modules/epic/entities/epic.entity';
import { ProjectComment } from '@modules/project/entities/project-comment.entity';

@Entity({name: 'project'})
@Index(['prefix', 'clientId'], {unique: true})
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({name: 'name', type: 'varchar', length: 255, nullable: false})
  name: string;

  @Column({name: 'description', type: 'varchar', length: 255, nullable: false})
  description: string;

  @Column({name: 'is_active', type: 'boolean', default: true})
  isActive: boolean;

  @Column({name: 'owner', type: 'uuid'})
  owner: string;

  /* TODO: Generate ENUM with all possible values
  @Column({name: 'status', type: 'varchar', length: 255, nullable: false})
  status: string;
  */

  @Column({name: 'date-start', type: 'date', nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  dateStart: Date;

  @Column({name: 'due-date', type: 'date', nullable: true})
  dueDate: Date;

  @Column({name: 'completed-date', type: 'date', nullable: true})
  completedDate: Date;

  @Column({name: 'prefix', type: 'varchar', length: 255, nullable: true})
  prefix: string;

  @Column({name: 'reference-url', type: 'varchar', length: 255, nullable: true})
  referenceUrl: string;

  @Column({name: 'client-id', type: 'uuid', nullable: false})
  clientId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Epic, (epic) => epic.project, {lazy: true})
  epic: Epic[];

  @OneToMany(() => ProjectComment, (projectComment) => projectComment.project, {lazy: true})
  comments: ProjectComment[];

  // @ManyToMany(() => User, {lazy: true})
  // users: User[];
}
