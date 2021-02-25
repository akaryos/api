import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'

import File from './File'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  @Exclude()
  password: string

  @Column()
  storage_usage: number

  @OneToMany(() => File, (file) => file.user_id)
  files: File[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
