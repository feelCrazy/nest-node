import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
@Entity()
export class Manuscript {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'longtext' })
  content: string;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ nullable: true, default: 1 })
  status: string;

  @Column({ nullable: true })
  remark: string;

  @CreateDateColumn()
  time: string;

  @UpdateDateColumn()
  update_time: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
