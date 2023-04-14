import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  getAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}
