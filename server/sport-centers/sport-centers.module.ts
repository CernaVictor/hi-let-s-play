import { Module } from '@nestjs/common';
import { SportCentersService } from './sport-centers.service';
import { SportCentersController } from './sport-centers.controller';
import { SportCenter } from './entities/sport-center.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, SportCenterPhoto } from 'server/entities/photo.entity';
import { OffBusinessHours } from 'server/events/entities/event.entity';
import { FileUploadModule } from 'server/file-upload/file-upload.module';

@Module({
  controllers: [SportCentersController],
  providers: [SportCentersService],
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([
      SportCenter,
      Photo,
      SportCenterPhoto,
      OffBusinessHours,
    ]),
  ],
  exports: [SportCentersService],
})
export class SportCentersModule {}
