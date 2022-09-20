import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Post } from '../../post/entities/post.entity';
import { Manuscript } from '../../manuscript/entities/manuscript.entity';
/**
 * user用户表
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  brithday: string;

  @Column({ default: true, select: false })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  address: string;

  @CreateDateColumn()
  time: string;

  @UpdateDateColumn()
  update_time: string;

  @Column({ nullable: true })
  sex: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Manuscript, (manuscript) => manuscript.user)
  manuscript: Manuscript[];
}
