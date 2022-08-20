import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * post新建主题表
 */

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  reply_id: number;

  @CreateDateColumn()
  time: string;

  @UpdateDateColumn()
  update_time: string;
}
