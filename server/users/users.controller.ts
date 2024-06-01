import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'server/auth/auth.guard';
import { AuthenticatedRequest } from 'common/types';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/loginWithUsernameAndPassword')
  async loginWithUsernameAndPassword(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.logInWithUsernameAndPassword(username, password);
  }

  @Post('/registerWithUsernameAndPassword')
  async registerWithUsernameAndPassword(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('confirmPassword') confirmPassword: string,
    @Body('isSportsCenterOwner') isSportsCenterOwner: string,
  ) {
    return this.usersService.registerWithUsernameAndPassword(
      username,
      password,
      email,
      name,
      confirmPassword,
      isSportsCenterOwner,
    );
  }

  @Get('/authTest')
  @UseGuards(AuthGuard)
  authTest(@Req() req: AuthenticatedRequest) {
    return req.token;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
