import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSportFieldDto } from './dto/create-sport-field.dto';
import { UpdateSportFieldDto } from './dto/update-sport-field.dto';
import { SportField } from './entities/sport-field.entity';

@Injectable()
export class SportFieldsService {
  constructor(
    @InjectRepository(SportField)
    private sportFieldsRepository: Repository<SportField>,
  ) {}
  create(createSportFieldDto: CreateSportFieldDto) {
    const sportsCenter = this.sportFieldsRepository.create({
      ...createSportFieldDto,
      sportCenter: { id: createSportFieldDto.sportCenterId },
      sport: { id: createSportFieldDto.sport },
    });
    return this.sportFieldsRepository.save(sportsCenter);
  }

  findAll(sportCenterId: string, userId: string) {
    return this.sportFieldsRepository.find({
      where: {
        sportCenter: {
          id: sportCenterId,
        },
      },
      relations: {
        sport: true,
      },
    });
  }

  findOne(id: string) {
    return this.sportFieldsRepository.findOne({ where: { id } });
  }

  update(id: string, updateSportFieldDto: UpdateSportFieldDto) {
    return this.sportFieldsRepository.update(id, updateSportFieldDto);
  }

  async remove(id: string, userId: string) {
    const event = await this.sportFieldsRepository.findOneOrFail({
      where: {
        id,
        sportCenter: {
          owner: {
            id: userId,
          },
        },
      },
    });
    return this.sportFieldsRepository.remove(event);
  }
}
