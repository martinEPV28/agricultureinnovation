import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class traderDto {
  login: string;

  @Column({ length: 80 })
  password: string;

  @IsString({ message: `El campo razon_social debe se un texto valido` })
  @IsNotEmpty({ message: `El campo razon_social no puede ser nullo o vacio` })
  razon_social: string;

  @IsString({ message: `El campo identificacion debe se un texto valido` })
  @IsNotEmpty({ message: `El campo identificacion no puede ser nullo o vacio` })
  identificacion: string;

  @IsString({ message: `El campo nombre debe se un texto valido` })
  @IsNotEmpty({ message: `El campo nombre no puede ser nullo o vacio` })
  nombre: string;

  @IsString({ message: `El campo apellido debe se un texto valido` })
  @IsNotEmpty({ message: `El campo apellido no puede ser nullo o vacio` })
  apellido: string;

  id_vendedor: number;
}
