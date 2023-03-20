import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm';

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export abstract class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @OneToMany(() => Comment, comment => comment.parent)
  children: Comment[];

  @OneToMany(() => Comment, comment => comment.parent)
  parent: Comment;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
