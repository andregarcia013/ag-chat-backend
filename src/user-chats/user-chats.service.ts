import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserChatDto } from './dto/create-user-chat.dto';
import { UserChat } from './entities/user-chat.entity';
import { Not, Repository } from 'typeorm';
import { Message } from '../messages/entities/message.entity';

@Injectable()
export class UserChatsService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRep: Repository<Message>,
    @InjectRepository(UserChat)
    private readonly userChatRep: Repository<UserChat>,
    @InjectRepository(User)
    private readonly userRep: Repository<User>,
  ) {}
  async getUserChats(user: number) {
    const _user = await this.userRep.findOne({
      where: { id: user },
      relations: ['userChats'],
    });

    const chats = await Promise.all(
      _user.userChats.map(async (chat) => {
        const [messages, total] = await this.messageRep.findAndCount({
          where: { receiver: { id: chat.id } },
          order: { createdAt: 'DESC' },
          take: 150,
          relations: {
            sender: true,
          },
        });

        const chatRef = await this.userChatRep.findOne({
          where: { id: chat.id },
          relations: ['participants'],
        });

        const totalUnread = await this.messageRep.count({
          where: {
            receiver: { id: chat.id },
            sender: Not(_user),
            messageStatus: 2,
          },
          order: { createdAt: 'DESC' },
        });

        chat['messages'] = messages.map((msg) => {
          msg['isFromMe'] = msg.sender.id == _user.id;
          return msg;
        });
        chat[`lastMessage`] = messages[0].message;
        chat[`participants`] = chatRef.participants.filter(
          (e) => e.id !== _user.id,
        );
        chat[`lastMessageStatus`] = messages[0].messageStatus;
        chat[`lastMessageDate`] = messages[0].createdAt;
        chat[`totalMessages`] = total;
        chat[`totalUnreadMessages`] = totalUnread;
        return chat;
      }),
    );
    return chats;
  }

  async getUserChatMessages(chatId: number, page: number) {
    const [messages, total] = await this.messageRep.findAndCount({
      where: { receiver: { id: chatId } },
      order: { createdAt: 'DESC' },
      take: 200,
      skip: page * 80,
    });

    return { messages, total, chatId };
  }

  async create(user: CreateUserChatDto): Promise<UserChat> {
    return await this.userChatRep.save(user);
  }
}
