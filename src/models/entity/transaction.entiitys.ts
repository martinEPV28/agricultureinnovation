import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("transacciones")
export class Transacciones {
  @PrimaryColumn() id: number;
  @Column() monto: number;
  @Column() id_vendedor: number;
  @Column() codigo_aprobacion: string;
  @Column() fecha_hora: string;
  @Column() latitud: number;
  @Column() longitud: number;
  @Column() url_imagen: string;
  @Column() id_trasaccion: number;
  @Column() fecha_creacion: string;
}
