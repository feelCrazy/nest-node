import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  time: string;

  @Column()
  post_id: string;

  @ManyToOne(() => Post, (post) => post.reply, { cascade: true })
  post: Post;

  @ManyToOne(() => User, (user) => user)
  user: User;
}
