import {
  Column,
  CreateDateColumn,
  Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm'

import { v4 as uuid } from 'uuid'

@Entity('products')
class Product {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  product: string;

  @Column()
  unitMeasurement: string;

  
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

 
}

export { Product }