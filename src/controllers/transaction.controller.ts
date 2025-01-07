import { Controller, Get, Body, Res, Post, UseGuards } from '@nestjs/common';
import { transactionDto } from 'src/models/dto/transaction.dto';
import { ResultDto } from 'src/models/dto/result.dto';
import { searchDto } from 'src/models/dto/search.dto';
import { TransactionService } from 'src/services/transaction.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/api/v1/trasaction/')
export class TransationController {
  constructor(private readonly transationService: TransactionService) {}

  @Get('find')
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiUnauthorizedResponse({ description: 'El token es inválido' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async findData(@Res() res, @Body() search: searchDto) {
    const resServiceDto: ResultDto = await this.transationService.find(search);
    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }

  @Get('list') 
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiUnauthorizedResponse({ description: 'El token es inválido' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async listData(@Res() res) {
    const resServiceDto: ResultDto = await this.transationService.findAll();
    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }

  @Post('save')
  @ApiOkResponse({ description: 'Petición completada con éxito' })
  @ApiUnauthorizedResponse({ description: 'El token es inválido' })
  @ApiConflictResponse({
    description: 'Conflicto de parámetros enviados por el cliente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Se generó un error en el servidor',
  })
  async saveData(@Res() res, @Body() transaction: transactionDto) {
    const resServiceDto: ResultDto =
      await this.transationService.create(transaction);

    return res.status(resServiceDto.status).json({
      message: resServiceDto.message,
      data: resServiceDto.data,
    });
  }
}
