import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => SportField, (sf) => sf.sport)
  sportField: SportField[];
}
