import { InjectRepository } from '@nestjs/typeorm';
import { Transacciones } from '../entity/transaction.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { transactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transacciones)
    private readonly transacionRepository: Repository<Transacciones>,
  ) {}

  async save(createTransaction: transactionDto) {
    console.log()
    return await this.transacionRepository.save(
      this.transacionRepository.create(createTransaction)
    );
  }

  async find() {
    return await this.transacionRepository.find();
  }

  async findOne(id_trasaccion: string) {
    return await this.transacionRepository.findOne({
      select: [
        'monto',
        'vendedor',
        'codigo_aprobacion',
        'fecha_hora',
        'latitud',
        'longitud',
        'url_imagen',
        'fecha_creacion',
      ],
      where: { id_trasaccion },
    });
  }

}
