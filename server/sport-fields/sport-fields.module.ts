import { Module } from '@nestjs/common';
import { SportFieldsService } from './sport-fields.service';
import { SportFieldsController } from './sport-fields.controller';
import { UsersModule } from 'server/users/users.module';
import { SportField } from './entities/sport-field.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportFieldPhoto } from 'server/entities/photo.entity';
import { Sport } from 'server/sports/entities/sport.entity';

@Module({
  controllers: [SportFieldsController],
  providers: [SportFieldsService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([SportField, SportFieldPhoto, Sport]),
  ],
})
export class SportFieldsModule {}
