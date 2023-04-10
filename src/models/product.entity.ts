import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column()
  ProductName: string;

  @Column()
  ProductDescription: string;

  @Column()
  UnitPrice: number;

  @Column()
  ProductImage: string;
}
