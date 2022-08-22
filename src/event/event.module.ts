import { CacheModule, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserChatsModule } from '../user-chats/user-chats.module';
import { UserModule } from '../user/user.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [
    CacheModule.register(),
    AuthModule,
    ConfigModule.forRoot(),
    UserChatsModule,
    UserModule,
    MessagesModule,
  ],
  providers: [EventGateway, EventService],
})
export class EventModule {}
