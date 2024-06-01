import { SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import { User } from 'server/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SportCenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  country: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false, type: 'float' })
  latitude: number;

  @Column({ nullable: false, type: 'float' })
  longitude: number;

  @OneToMany(() => SportField, (sf) => sf.sportCenter)
  sportFields: SportField[];

  @ManyToOne(() => User, (user) => user.sportCenters)
  owner: User;

  @OneToOne(() => OffBusinessHours, (bh) => bh.sportCenter, { cascade: true })
  offBusinessHours: OffBusinessHours;

  @OneToMany(() => SportCenterPhoto, (scp) => scp.sportCenter, {
    cascade: true,
    eager: true,
  })
  imageGallery: SportCenterPhoto[];
}
