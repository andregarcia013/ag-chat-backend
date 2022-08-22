import { Module } from '@nestjs/common';
import { UserChatsService } from './user-chats.service';
import { UserChatsController } from './user-chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChat } from './entities/user-chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Message } from '../messages/entities/message.entity';

@Module({
  controllers: [UserChatsController],
  providers: [UserChatsService],
  imports: [TypeOrmModule.forFeature([UserChat, User, Message])],
  exports: [UserChatsService],
})
export class UserChatsModule {}
