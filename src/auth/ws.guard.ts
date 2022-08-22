import * as jwt from 'jsonwebtoken';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const cookies: string[] =
      client.handshake.headers.authorization.split('Bearer ');
    const authToken = cookies[1];
    const jwtPayload = jwt.verify(
      authToken,
      this.configService.get<string>('JWT_SECRET'),
    );

    const user: User = await this.authService.validateUsername(
      jwtPayload['username'],
    );

    console.log(user);

    client.user = user;
    context.switchToWs().getData().user = user;
    return Boolean(user);
  }
}
