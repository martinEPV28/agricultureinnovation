import { Controller, Get, Put, Body, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { transactionDto } from 'src/models/transaction.dto';
import { ResultDto } from 'src/models/result.dto';

@Controller('/api/transation')
export class TransationController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  @ApiTags('Agriculture Innovation')
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
  listData(): string {
    return this.appService.list();
  }

  @Put('save')
  @ApiTags('Agriculture Innovation')
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
  saveData(): string {
    return this.appService.list();
  }

  @Put('update')
  updateData(): string {
    return this.appService.list();
  }

  @Get('cloud')
  @ApiExcludeEndpoint()
  async cloudData(@Res() res, @Body() transaction: transactionDto) {
    const resServiceDto: ResultDto = await this.appService.save(transaction);
    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }
}
