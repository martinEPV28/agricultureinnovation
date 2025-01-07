import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class traderLoginDto {
  @IsString({ message: `El campo login debe se un texto valido` })
  @IsNotEmpty({ message: `El campo login no puede ser nullo o vacio` })
  login: string;

  @IsNotEmpty({ message: `El campo password no puede ser nullo o vacio` })
  @Column({ length: 15 })
  password: string;
}
