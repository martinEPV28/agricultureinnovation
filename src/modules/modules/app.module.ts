import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransationModule } from './transaction.module';
import { join } from 'path';
import { TraderModule } from './trader.module';
import * as cookieParser from 'cookie-parser';
import { CsrfMiddleware } from 'src/middlewares/csrf.middleware';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        //entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TransationModule,
    TraderModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), CsrfMiddleware)
      .forRoutes('/api/v1/trader/list'); // Puedes limitar las rutas donde aplicar CSRF
  }
}
