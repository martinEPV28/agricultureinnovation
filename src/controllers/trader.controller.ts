import { Controller, Post, Body, Res } from '@nestjs/common';
import { traderDto } from '../models/dto/trader.dto';
import { ResultDto } from '../models/dto/result.dto';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { traderLoginDto } from '../models/dto/traderLogin.dto';
import { TraderService } from '../services/trader.service';

@Controller('/api/v1/trader/')
export class TraderController {
  constructor(private readonly traderService: TraderService) {}

  @Post('register')
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async registerData(@Res() res, @Body() createTraderDto: traderDto) {
    const resServiceDto: ResultDto =
      await this.traderService.create(createTraderDto);

    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }
  @Post('login')
  async login(@Res() res, @Body() loginTraderDto: traderLoginDto) {
    const resServiceDto: ResultDto = await this.traderService.validateUser(
      loginTraderDto.login,
      loginTraderDto.password,
    );

    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }
}
