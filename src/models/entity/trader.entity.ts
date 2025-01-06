import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("traders")
export class Trader {
  @PrimaryColumn() id: number;
  @Column({ unique: true }) login: string;
  @Column() password: string;
  @Column({ unique: true }) razon_social: string;
  @Column({ unique: true }) identificacion: string;
  @Column() nombre: string;
  @Column() apellido: string;
  @Column() id_vendedor: number;
  @Column() fecha_creacion: Date;
}
