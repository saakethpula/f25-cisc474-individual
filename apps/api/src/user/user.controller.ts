
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@CurrentUser() user: any) {
    return user;
  }
}
