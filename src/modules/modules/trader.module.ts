import { Module } from '@nestjs/common';
import { TraderController } from '../../controllers/trader.controller';
import { TraderService } from 'src/services/trader.service';
import { TransactionRepository } from 'src/modules/repository/transationRepository';
import { TraderRepository } from 'src/modules/repository/traderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacciones } from 'src/models/entity/transaction.entity';
import { Trader } from 'src/models/entity/trader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transacciones, Trader])],
  controllers: [TraderController],
  providers: [TraderService, TransactionRepository, TraderRepository],
})
export class TraderModule {}
