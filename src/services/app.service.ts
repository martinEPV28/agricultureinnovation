import { Injectable, HttpStatus } from '@nestjs/common';
import { ResultDto } from 'src/models/dto/result.dto';
import { searchDto } from 'src/models/dto/search.dto';
import { transactionDto } from 'src/models/dto/transaction.dto';

@Injectable()
export class AppService {
  private readonly storage: Storage;

  async save(transaction: transactionDto): Promise<ResultDto> {
    let result = '';
    let message: string;
    let data: any = [];

    message = `Peticion Exitosa `;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 12; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
    }
    data = { "transation": result };
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = data;
    resServiceDto.status = HttpStatus.OK;
    resServiceDto.message = message;
    return resServiceDto;
  }

  async list(transaction: transactionDto): Promise<ResultDto> {
    let message = `Faltan datos para realizar la peticion`;
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = transaction;
    resServiceDto.status = HttpStatus.OK;
    resServiceDto.message = message;
    return resServiceDto;
  }

  async find(search: searchDto): Promise<ResultDto> {
    let message = `Peticion Exitosa `;
    let data: any = [];

    data = {
      "transaccion": search.transaccion,
      "estado": 'aprobado',
      "monto": 54144414 };
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = data;
    resServiceDto.status = HttpStatus.OK;
    resServiceDto.message = message;
    return resServiceDto;
  }

}
