import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { WsGuard } from './ws.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1y' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
