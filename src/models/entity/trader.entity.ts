import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("traders")
export class Trader {
  @PrimaryColumn() id: number;
  @Column() razon_social: string;
  @Column() identificacion: string;
  @Column() nombre: string;
  @Column() apellido: string;
  @Column() id_vendedor: number;
  @Column() fecha_creacion: Date;
}
