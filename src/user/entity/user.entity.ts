import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Post } from '../../post/entities/post.entity';

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

  @Column({ default: true, select: false })
  isActive: boolean;

  @Column({ select: false })
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
}
