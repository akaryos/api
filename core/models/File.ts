import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import User from './User'

@Entity('files')
class File {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  original: string

  @Column()
  type: string

  @Column()
  size: number

  @Column()
  url: string

  @Column('uuid')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  author: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default File
