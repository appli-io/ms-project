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
}               from 'typeorm';
import { Epic } from '@modules/epic/entities/epic.entity';

@Entity({name: 'project'})
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

  @Column({name: 'date-start', type: 'date', nullable: false})
  dateStart: Date;

  @Column({name: 'date-end', type: 'date', nullable: false})
  dateEnd: Date;

  @Column({name: 'reference-code', type: 'varchar', length: 255, nullable: true})
  referenceCode: string;

  @Column({name: 'reference-url', type: 'varchar', length: 255, nullable: true})
  referenceUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Epic, (epic) => epic.project)
  epic: Epic[];
}
