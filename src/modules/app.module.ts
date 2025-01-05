import { Module } from '@nestjs/common';
import { TransationController } from '../controllers/transaction.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TransationController],
  providers: [AppService],
})
export class AppModule {}
