import { Module } from '@nestjs/common';
import { TransationController } from '../../controllers/transaction.controller';
import { TransactionService } from 'src/services/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacciones } from 'src/models/entity/transaction.entity';
import { TransactionRepository } from 'src/modules/repository/transationRepository';
import { TraderRepository } from 'src/modules/repository/traderRepository';
import { Trader } from 'src/models/entity/trader.entity';
import { JwtStrategy } from 'src/utils/jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Transacciones, Trader])],
  controllers: [TransationController],
  providers: [TransactionService, TransactionRepository, TraderRepository, JwtStrategy, ConfigService],
})
export class TransationModule {}
