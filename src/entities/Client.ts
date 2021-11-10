import {
  Column,
  CreateDateColumn,
  Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('clients')
class Client {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  telephone: string;

  @Column()
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;


  

}

export { Client }