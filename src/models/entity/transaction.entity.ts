import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('transactions')
export class Transacciones {
  @PrimaryColumn() id: number;
  @Column() monto: number;
  @Column() vendedor: number;
  @Column() codigo_aprobacion: string;
  @Column() fecha_hora: Date;
  @Column() latitud: number;
  @Column() longitud: number;
  @Column() url_imagen: string;
  @Column({ unique: true }) id_trasaccion: string;
  @Column() fecha_creacion: Date;
}
