import { Module } from '@nestjs/common';
import { AppController } from '../../app/controllers/app.controller';
import { TransationController } from '../../app/controllers/transaction.controller';
import { AppService } from '../../domain/services/app.service';

@Module({
  imports: [],
  controllers: [AppController, TransationController],
  providers: [AppService],
})
export class AppModule {}
