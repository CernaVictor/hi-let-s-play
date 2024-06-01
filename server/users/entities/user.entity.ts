import { Event } from 'server/events/entities/event.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Event, (event) => event.creator)
  events: Event[];

  @Column({ default: false })
  isSportsCenterOwner: boolean;

  @OneToMany(() => SportCenter, (sc) => sc.owner)
  sportCenters: SportCenter[];
}
