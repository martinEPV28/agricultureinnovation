import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Trader } from '../../models/entity/trader.entity';
import { traderDto } from '../../models/dto/trader.dto';

@Injectable()
export class TraderRepository {
  constructor(
    @InjectRepository(Trader)
    private readonly traderRepository: Repository<Trader>,
  ) {}

  async save(createTraderDto: traderDto) {
    return await this.traderRepository.save(
      this.traderRepository.create(createTraderDto),
    );
  }

  async find() {
    return await this.traderRepository.find();
  }

  async findOneIdentiti(identificacion: string) {
    return await this.traderRepository.findOne({
      where: { identificacion },
    });
  }

  async findOneTrader(id_vendedor: number) {
    return await this.traderRepository.findOne({
      where: { id_vendedor },
    });
  }

  async create(createTraderDto: traderDto) {
    console.log('consola');
    return await this.traderRepository.save(
      this.traderRepository.create(createTraderDto),
    );
  }

  async find2() {
    return await this.traderRepository.find();
  }

  async findOne2(id_vendedor: number) {
    return await this.traderRepository.findOne({
      where: { id_vendedor },
    });
  }

  async update2(id: number, updateTraderDto: traderDto) {
    return this.traderRepository.update(+id, updateTraderDto);
  }

  async remove2(id: number) {
    //return this.traderRepository.remove(id);
  }
}
