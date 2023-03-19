import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project }                                                              from '@modules/project/entities/project.entity';
import { ProjectRolEnum }                                                       from '@modules/project/enum/role.enum';

@Entity('project-participant')
export class ProjectParticipant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @OneToMany(() => Project, (project) => project.id)
  projectId: string;

  @Column({name: 'user_id', type: 'uuid'})
  userId: string;

  @Column({name: 'role', type: 'varchar', length: 255, nullable: false})
  role: ProjectRolEnum;
}
