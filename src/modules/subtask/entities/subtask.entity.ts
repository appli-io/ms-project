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
}                         from 'typeorm';
import { Task }           from '@modules/task/entities/task.entity';
import { SubtaskComment } from '@modules/subtask/entities/subtask-comment.entity';

@Entity({name: 'subtask'})
export class Subtask extends BaseEntity {

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

  @Column({name: 'due-date', type: 'date', nullable: false})
  dueDate: Date;

  @Column({name: 'completed-date', type: 'date', nullable: false})
  completedDate: Date;

  @Column({name: 'reference-code', type: 'varchar', length: 255, nullable: true})
  referenceCode: string;

  @Column({name: 'reference-url', type: 'varchar', length: 255, nullable: true})
  referenceUrl: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => Task, (task) => task.subtask)
  task: Task;

  @OneToMany(() => SubtaskComment, (subtaskComment) => subtaskComment.subtask)
  comments: SubtaskComment[];
}
