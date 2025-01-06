import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TransationController } from 'src/controllers/transaction.controller';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // Cambia esto por una clave segura
      signOptions: {
        expiresIn: '15m', // Expiración del token: 15 minutos
      },
    }),
  ],
  controllers: [TransationController],
  providers: [],
  exports: [JwtModule], // Exportar para usarlo en otros módulos si es necesario
})
export class AuthModule {}
