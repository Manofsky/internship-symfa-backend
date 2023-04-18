import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { Product } from '../models/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
