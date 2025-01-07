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

  async findOneRazonSocial(razon_social: string) {
    return await this.traderRepository.findOne({
      where: { razon_social },
    });
  }

  async findByLogin(login: string) {
    return await this.traderRepository.findOne({
      where: { login },
    });
  }
  

  async update2(id: number, updateTraderDto: traderDto) {
    return this.traderRepository.update(+id, updateTraderDto);
  }

  async remove2(id: number) {
    //return this.traderRepository.remove(id);
  }
}
