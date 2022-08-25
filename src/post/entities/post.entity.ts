import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Reply } from '../../reply/entities/reply.entity';

/**
 * post新建主题表
 */

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  reply_id: string;

  @CreateDateColumn()
  time: string;

  @UpdateDateColumn()
  update_time: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Reply, (reply) => reply.post)
  reply: Reply[];
}
