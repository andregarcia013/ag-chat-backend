import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserAuthDTO } from './user/dto/user-auth.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth')
  @HttpCode(200)
  async login(@Body() userDto: UserAuthDTO) {
    return this.authService.login(userDto);
  }
}
