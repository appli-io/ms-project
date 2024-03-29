import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from 'typeorm';

@Entity('comments')
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export abstract class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @OneToMany(() => Comment, comment => comment.parent)
  children?: Comment[];

  @ManyToOne(() => Comment, comment => comment.children, {nullable: true})
  parent?: Comment;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
