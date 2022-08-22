import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserAuthDTO } from './dto/user-auth.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('me')
  findOne(@Request() req) {
    return req.user;
  }

  @Get('search')
  findUser(@Request() req, @Query('search') search: string) {
    return this.userService.findUser(search);
  }
}
