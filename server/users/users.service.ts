import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneOrFail({
      where: {
        username,
      },
    });
  }

  async logInWithUsernameAndPassword(username: string, password: string) {
    const user = await this.findByUsername(username);

    const isMatchingPassword = await bcrypt.compare(password, user.password);

    if (isMatchingPassword) return user;

    return null;
  }

  async registerWithUsernameAndPassword(
    username: string,
    password: string,
    email: string,
    name: string,
    confirmPassword: string,
    isSportsCenterOwner: string,
  ) {
    if (password === confirmPassword) {
      const hash = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        username,
        email,
        name,
        password: hash,
        isSportsCenterOwner: isSportsCenterOwner === 'true',
      });

      return this.usersRepository.save(user);
    }

    throw new NotAcceptableException(403);
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return this.usersRepository.delete(user.id);
    }
  }
}
