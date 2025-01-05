import { IsNotEmpty, IsString } from 'class-validator';

export class searchDto {
  @IsString({
    message: `El campo transaccion debe ser string`
  })
  @IsNotEmpty({
    message: `El campo transaccion debe ser string`
  })
  transaccion: string;
}
