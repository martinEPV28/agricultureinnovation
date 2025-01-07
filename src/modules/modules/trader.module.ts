import { Module } from '@nestjs/common';
import { TraderController } from '../../controllers/trader.controller';
import { TraderService } from 'src/services/trader.service';
import { TransactionRepository } from 'src/modules/repository/transationRepository';
import { TraderRepository } from 'src/modules/repository/traderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transacciones } from 'src/models/entity/transaction.entity';
import { Trader } from 'src/models/entity/trader.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/utils/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // Missing this
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '1h',
        },
        secret: process.env.JWT_SECRECT,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Transacciones, Trader]),
  ],
  controllers: [TraderController],
  providers: [
    TraderService,
    TransactionRepository,
    TraderRepository,
    JwtStrategy,
  S],
})
export class TraderModule {}
