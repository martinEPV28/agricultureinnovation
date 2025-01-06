import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResultDto } from 'src/models/dto/result.dto';
import { traderDto } from 'src/models/dto/trader.dto';
import { TraderService } from 'src/services/trader.service';

@Controller('/api/v1/trader/')
export class TraderController {
  constructor(private readonly traderService: TraderService) {}

  @Post()
  register2(@Body() createTraderDto: traderDto) {
    return this.traderService.create(createTraderDto);
  }

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
}
