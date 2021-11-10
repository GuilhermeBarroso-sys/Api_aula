import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";

@Entity('balanceInventory')
class BalanceInventory {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product)
  product: Product

  @Column()
  product_id: string

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()  
  updated_at: Date;


}

export { BalanceInventory }