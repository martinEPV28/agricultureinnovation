import { InjectRepository } from '@nestjs/typeorm';
import { Transacciones } from '../entity/transaction.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { transactionDto } from '../dto/transaction.dto';
import { Trader } from '../entity/trader.entity';

@Injectable()
export class TraderRepository {
  constructor(
    @InjectRepository(Trader)
    private readonly traderRepository: Repository<Trader>,
  ) {}

  async save(createTransaction: transactionDto) {
    console.log('consola');
    /*return await this.traderRepository.save(
      this.traderRepository.create(createTransaction)
    );*/
  }

  async find() {
    return await this.traderRepository.find();
  }

  async findOne(id_vendedor: number) {
    return await this.traderRepository.findOne({
      where: { id_vendedor },
    });
  }
}
