import { Injectable, HttpStatus } from '@nestjs/common';
import { ResultDto } from 'src/models/dto/result.dto';
import { searchDto } from 'src/models/dto/search.dto';
import { transactionDto } from 'src/models/dto/transaction.dto';
import { TraderRepository } from 'src/modules/repository/traderRepository';
import { TransactionRepository } from 'src/modules/repository/transationRepository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transationRepository: TransactionRepository,
    private readonly traderRepository: TraderRepository,
  ) {}
  private readonly storage: Storage;

  async create(createTransaction: transactionDto): Promise<ResultDto> {
    let result,
      id_trasaccion: any = '';
    let message: string;
    let data: any = [];
    const resServiceDto: ResultDto = new ResultDto();
    result = await this.traderRepository.findOneTrader(
      createTransaction.vendedor,
    );
    if (result) {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 12; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        id_trasaccion += characters.charAt(randomInd);
      }
      data = { transation: id_trasaccion };

      createTransaction.id_trasaccion = id_trasaccion;
      createTransaction.url_imagen = createTransaction.imagen_recibida;
      result = await this.transationRepository.save(createTransaction);

      if (result) {
        message = `Peticion Exitosa `;
        resServiceDto.data = data;
        resServiceDto.status = HttpStatus.OK;
      } else {
        message = `Error al ingresar la informacion`;
        resServiceDto.data = result;
        resServiceDto.status = HttpStatus.CONFLICT;
      }
    } else {
      message = `Id Vendedor Incorrecto`;
      resServiceDto.status = HttpStatus.NOT_FOUND;
    }

    resServiceDto.message = message;
    return resServiceDto;
  }

  async findAll() {
    const resServiceDto: ResultDto = new ResultDto();
    resServiceDto.data = this.transationRepository.find();
    resServiceDto.status = HttpStatus.OK;
    resServiceDto.message = `Peticion Exitosa `;
    return resServiceDto;
  }

  async find(search: searchDto): Promise<ResultDto> {
    let transation: any = '';
    const resServiceDto: ResultDto = new ResultDto();
    transation = await this.transationRepository.findOne(search.transaccion);
    if (transation) {
      resServiceDto.status = HttpStatus.OK;
      resServiceDto.message = `Peticion Exitosa `;
    } else {
      resServiceDto.status = HttpStatus.NOT_FOUND;
      resServiceDto.data = { transation: search.transaccion };
      resServiceDto.message = `Error al consultar la transaccion`;
    }

    resServiceDto.data = transation;
    return resServiceDto;
  }
}
