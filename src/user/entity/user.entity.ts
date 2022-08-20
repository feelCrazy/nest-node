import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
/**
 * user用户表
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

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
}
