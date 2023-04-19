import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
}                      from 'typeorm';
import { Project }     from '@modules/project/entities/project.entity';
import { Task }        from '@modules/task/entities/task.entity';
import { EpicComment } from '@modules/epic/entities/epic-comment.entity';

@Entity()
export class Epic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'name', type: 'varchar', length: 255, nullable: false})
  name: string;

  @Column({name: 'description', type: 'varchar', length: 255, nullable: false})
  description: string;

  @Column({name: 'is_active', type: 'boolean', default: true})
  isActive: boolean;

  @Column({name: 'owner', type: 'uuid'})
  owner: string;

  @Column({name: 'date-start', type: 'date', nullable: false})
  dateStart: Date;

  @Column({name: 'date-end', type: 'date', nullable: false})
  dateEnd: Date;

  @Column({name: 'prefix', type: 'varchar', length: 255, nullable: false})
  prefix: string;

  @Column({name: 'reference-url', type: 'varchar', length: 255, nullable: false})
  referenceUrl: string;

  @Column({name: 'project-id', nullable: false, type: 'uuid'})
  projectId: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Project, (project) => project.id)
  project: Project;

  @OneToMany(() => Task, (task) => task.epic)
  task: Task[];

  @OneToMany(() => EpicComment, (epicComment) => epicComment.epic)
  comments: EpicComment[];
}

