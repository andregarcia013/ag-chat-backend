import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UserChat } from '../user-chats/entities/user-chat.entity';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [TypeOrmModule.forFeature([Message, UserChat])],
  exports: [MessagesService],
})
export class MessagesModule {}
