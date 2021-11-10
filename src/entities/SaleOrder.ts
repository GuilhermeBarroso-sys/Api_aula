import {
  Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column,
  JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm'

import { v4 as uuid } from 'uuid'

import { Client } from './Client'
import { Product } from './Product';

@Entity('saleOrders')
class SaleOrder {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @JoinColumn({ name: 'client_id' })
  @ManyToOne(() => Client)
  client: Client;

  @Column()
  client_id: string;

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product)
  product: Product;

  @Column()
  product_id: string;

  @Column()
  amount: number;

  @Column()
  saleDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()  
  updated_at: Date;
}

export { SaleOrder }

