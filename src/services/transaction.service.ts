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
      id_trasaccion,
      dataRespons,
      statusRepons,
      messageRespons : any = '';
    const resServiceDto: ResultDto = new ResultDto();
    result = await this.traderRepository.findOneTrader(
      createTransaction.vendedor,
    );
    if (result) {
      id_trasaccion ='';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 12; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        id_trasaccion += characters.charAt(randomInd);
      }
      dataRespons = { transation: id_trasaccion };

      createTransaction.id_trasaccion = id_trasaccion;
      createTransaction.url_imagen = createTransaction.imagen_recibida;
      result = await this.transationRepository.save(createTransaction);

      if (result) {
        messageRespons = `Peticion Exitosa `;
        statusRepons = HttpStatus.OK;
      } else {
        messageRespons = `Error al ingresar la informacion`;
        dataRespons = result;
        statusRepons = HttpStatus.CONFLICT;
      }
    } else {
      messageRespons = `Id Vendedor Incorrecto`;
      statusRepons = HttpStatus.NOT_FOUND;
      dataRespons =`Error`;
    }

    resServiceDto.data = dataRespons;
    resServiceDto.status = statusRepons;
    resServiceDto.message = messageRespons;
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
