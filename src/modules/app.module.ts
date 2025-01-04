import { Module } from '@nestjs/common';
import { TransationController } from '../controllers/transaction.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [],
  controllers: [TransationController],
  providers: [AppService],
})
export class AppModule {}
