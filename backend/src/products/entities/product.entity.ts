import { SaleItem } from 'src/sales/entities/sale-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => SaleItem, (item) => item.product)
  saleItems: SaleItem[];
}
