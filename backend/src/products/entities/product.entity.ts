import { Category } from 'src/categories/entities/category.entity';
import { SaleItem } from 'src/sales/entities/sale-item.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UnitType } from '../enum/unit-type-enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  retailPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  wholesalePrice: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'enum', enum: UnitType, default: UnitType.UNIT })
  unitType: UnitType

  @OneToMany(() => SaleItem, (item) => item.product)
  saleItems: SaleItem[];

  @ManyToOne(() => Category, category => category.products, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
