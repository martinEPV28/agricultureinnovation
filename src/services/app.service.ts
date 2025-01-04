import { Injectable, HttpStatus } from '@nestjs/common';
import { ResultDto } from 'src/models/result.dto';
import { transactionDto } from 'src/models/transaction.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  list(): string {
    return 'listados api';
  }
  async save(transaction: transactionDto): Promise<ResultDto> {
    console.log(transaction);
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = transaction;
    resServiceDto.status = HttpStatus.OK;
    resServiceDto.message = `Faltan datos para realizar la peticion `;
    return resServiceDto;
  }
}
