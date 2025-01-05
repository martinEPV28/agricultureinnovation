import { Controller, Get, Body, Res, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { transactionDto } from 'src/models/dto/transaction.dto';
import { ResultDto } from 'src/models/dto/result.dto';
import { searchDto } from 'src/models/dto/search.dto';

@Controller('/api/v1/')
export class TransationController {
  constructor(private readonly appService: AppService) {}

  @Get('find')
  @ApiHeader({
    name: 'token-api',
    required: true,
    description:
      'El token es el asignado por la empresa una vez se tengan acurdos comerciales',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiUnauthorizedResponse({ description: 'El token-api es inválido' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async findData(@Res() res, @Body() search: searchDto) {
    const resServiceDto: ResultDto = await this.appService.find(search);
    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }

  @Get('list')
  @ApiHeader({
    name: 'token-api',
    required: true,
    description:
      'El token es el asignado por la empresa una vez se tengan acurdos comerciales',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiUnauthorizedResponse({ description: 'El token-api es inválido' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async listData(@Res() res, @Body() transaction: transactionDto) {
    const resServiceDto: ResultDto = await this.appService.list(transaction);
    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }

  @Post('save')
  @ApiHeader({
    name: 'token-api',
    required: true,
    description:
      'El token es el asignado por la empresa una vez se tengan acurdos comerciales',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiUnauthorizedResponse({ description: 'El token-api es inválido' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async cloudData(@Res() res, @Body() transaction: transactionDto) {
    const resServiceDto: ResultDto = await this.appService.save(transaction);
    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }
}
