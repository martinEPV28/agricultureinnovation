import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class transactionDto {
  @IsNumber({}, { message: `El campo monto debe ser un número válido` })
  @IsNotEmpty({ message: `El campo monto no puede ser nullo o vacio`})
  monto: number;

  @IsNumber({}, { message: `El campo vendedor debe ser un número válido` })
  @IsNotEmpty({ message: `El campo vendedor no puede ser nullo o vacio`})
  vendedor: number;

  @IsString({
    message: `El campo codigo_aprobacion debe contener solo numero o letras`
  })
  @IsNotEmpty({
    message: `El campo codigo_aprobacion no puede ser nullo o vacio`
  })
  codigo_aprobacion: string;

  @IsDateString(
    {},
    { message: `El campo fecha_hora debe tener formato yyyy-MM-dd hh:mm`})
  @IsNotEmpty({ message: `El campo fecha_hora no puede ser nullo o vacio`})
  fecha_hora: Date;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'El campo latitud debe ser un número válido' })
  @IsNotEmpty({ message: `El campo latitud no puede ser nullo o vacio`})
  latitud: number;

  @IsNumber({}, { message: `El campo longitud debe ser un número válido` })
  @IsNotEmpty({ message: `El campo longitud no puede ser nullo o vacio`})
  longitud: number;

  @IsString()
  imagen_recibida: string;

  @IsNumber(
    {},
    { message: `El campo tipo_trasaccion debe ser un número válido` }
  )
  @IsNotEmpty({
    message: `El campo tipo_trasaccion no puede ser nullo o vacio`
  })
  tipo_trasaccion: number;
}
