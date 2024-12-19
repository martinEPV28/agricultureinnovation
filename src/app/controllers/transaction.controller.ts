import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from '../../domain/services/app.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

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
}
