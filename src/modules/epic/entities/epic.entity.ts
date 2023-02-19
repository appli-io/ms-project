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
}                  from 'typeorm';
import { Project } from '@modules/project/entities/project.entity';
import { Task }    from '@modules/task/entities/task.entity';

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

  @Column({name: 'reference-code', type: 'varchar', length: 255, nullable: false})
  referenceCode: string;

  @Column({name: 'reference-url', type: 'varchar', length: 255, nullable: false})
  referenceUrl: string;

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

}

