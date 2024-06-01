import { ActivePeriod } from 'server/active-periods/entities/active-period.entity';
import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import { User } from 'server/users/entities/user.entity';
import {
  ChildEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.events, {
    onDelete: 'CASCADE',
    eager: true,
  })
  creator: User;

  @OneToMany(() => ActivePeriod, (ap) => ap.event, {
    eager: true,
    cascade: true,
  })
  activePeriods: ActivePeriod[];
}

@ChildEntity()
export class OffBusinessHours extends Event {
  @JoinColumn()
  @OneToOne(() => SportCenter, (sc) => sc.offBusinessHours, {
    onDelete: 'CASCADE',
  })
  sportCenter: SportCenter;
}

@ChildEntity()
export class SportFieldEvent extends Event {
  @ManyToOne(() => SportField, (sf) => sf.events, {
    onDelete: 'CASCADE',
  })
  sportField: SportField;
}
