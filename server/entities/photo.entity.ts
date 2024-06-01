import { SportCenter } from 'server/sport-centers/entities/sport-center.entity';
import { SportField } from 'server/sport-fields/entities/sport-field.entity';
import {
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Photo {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;
}

@ChildEntity()
export class SportCenterPhoto extends Photo {
  @ManyToOne(() => SportCenter, (sc) => sc.imageGallery, {
    onDelete: 'CASCADE',
  })
  sportCenter: SportCenter;
}

@ChildEntity()
export class SportFieldPhoto extends Photo {
  @ManyToOne(() => SportField, (sf) => sf.imageGallery, {
    onDelete: 'CASCADE',
  })
  sportField: SportField;
}
