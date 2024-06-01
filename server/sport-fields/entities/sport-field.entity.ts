import { SportFieldPhoto } from 'server/entities/photo.entity';
import { SportFieldEvent } from 'server/events/entities/event.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { Sport } from 'server/sports/entities/sport.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SportField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isHeated: boolean;

  @Column({ default: false })
  isIluminated: boolean;

  @Column({ default: false })
  isIndoor: boolean;

  @Column({ default: false })
  isCovered: boolean;

  @OneToMany(() => SportFieldEvent, (ev) => ev.sportField)
  events: SportFieldEvent[];

  @ManyToOne(() => SportCenter, (sc) => sc.sportFields, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  sportCenter: SportCenter;

  @OneToMany(() => SportFieldPhoto, (sf) => sf.sportField, { cascade: true })
  imageGallery: SportFieldPhoto[];

  @ManyToOne(() => Sport, (sport) => sport.sportField)
  sport: Sport;
}
