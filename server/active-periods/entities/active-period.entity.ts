import { Event } from 'server/events/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DayOfTheWeek } from 'common/types';
import { IsDivisibleBy, Max, Min } from 'class-validator';

@Entity()
export class ActivePeriod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Event, (event) => event.activePeriods, {
    onDelete: 'CASCADE',
  })
  event: Event;

  @Column({ type: 'timestamp' })
  validFrom: string;

  @Column({ type: 'timestamp', nullable: true })
  validThrough: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ nullable: false })
  @IsDivisibleBy(30)
  duration: number;

  @Column({
    nullable: false,
  })
  @Min(0)
  @Max(6)
  dayOfTheWeek: DayOfTheWeek;
}
