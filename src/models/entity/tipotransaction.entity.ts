import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("tipotransaccion")
export class TipoTransacciones {
  @PrimaryColumn() id: number;
  @Column() tipo: string;
  @Column() estado: boolean;
  @Column() fecha_creacion: string;
}
