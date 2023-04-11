import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { Response as ResponseType } from 'express';

@Controller('goods')
export class GoodsController {
  constructor() {}

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
