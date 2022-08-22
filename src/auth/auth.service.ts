import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserAuthDTO } from '../user/dto/user-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.auth({ username, password: pass });
    console.log(user);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUsername(username: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDTO: UserAuthDTO) {
    const user = await this.validateUser(userDTO.username, userDTO.password);
    if (user) {
      const payload = { username: user.username, sub: user.id };
      return {
        authToken: this.jwtService.sign(payload),
        authUser: user,
      };
    }

    return false;
  }
}
