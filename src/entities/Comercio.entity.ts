import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comercio {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'char',
    length: 16,
    unique: true,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true
  })
  name: string;
}