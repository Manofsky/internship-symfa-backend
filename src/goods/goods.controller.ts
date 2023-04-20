import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { GoodsService } from './goods.service';
import { Product } from '../models/product.entity';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.goodsService.getAll();
  }

  @Get('small/:imagename')
  getSmallImage(@Param('imagename') image: string, @Res() res: ResponseType) {
    const response = res.sendFile(image, {
      root: './images/goods/small',
    });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Get('big/:imagename')
  getBigImage(@Param('imagename') image: string, @Res() res: ResponseType) {
    const response = res.sendFile(image, {
      root: './images/goods/big',
    });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
