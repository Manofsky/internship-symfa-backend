import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column()
  ProductType: 'food' | 'drink';

  @Column()
  ProductName: string;

  @Column()
  ProductWeight: string;

  @Column()
  isSpicy: boolean;

  @Column()
  isVegetarian: boolean;

  @Column()
  ProductDescription: string;

  @Column('numeric')
  UnitPrice: number;

  @Column()
  SmallImagePath: string;

  @Column()
  BigImagePath: string;
}
