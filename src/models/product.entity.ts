import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column()
  ProductType: 'food' | 'drink';

  @Column()
  ProductTitle: string;

  @Column()
  ProductSubtitle: string;

  @Column()
  isSpicy: boolean;

  @Column()
  isVegetarian: boolean;

  @Column()
  ProductDescription: string;

  @Column('numeric', {
    precision: 4,
    scale: 2,
  })
  UnitPrice: number;

  @Column()
  SmallImage: string;

  @Column()
  BigImage: string;
}
