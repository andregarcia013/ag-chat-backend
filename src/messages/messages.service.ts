import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { UserChat } from '../user-chats/entities/user-chat.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRep: Repository<Message>,
    @InjectRepository(UserChat)
    private readonly userChatRep: Repository<UserChat>,
  ) {}

  async save(createMessageDto: CreateMessageDto) {
    const message = await this.messageRep.findOneBy({
      idRef: createMessageDto.idRef,
    });

    if (message) {
      const { receiver, sender, ...toUpdate } = createMessageDto;
      return {
        message: await this.messageRep.save({ message, ...toUpdate }),
        chat: createMessageDto.receiver,
      };
    }

    let chat = await this.userChatRep.findOne({
      where: {
        idRef: createMessageDto.receiver.idRef,
      },
      relations: {
        participants: true,
      },
    });

    if (chat == null) {
      chat = await this.userChatRep.save(createMessageDto.receiver);
    }

    createMessageDto.receiver = chat;

    return {
      message: await this.messageRep.save(createMessageDto),
      chat,
      participants: createMessageDto.receiver.participants,
    };
  }

  async updateMessagesStatus(
    chatId: number,
    owner: User,
    olderStatus: number,
    newStatus: number,
  ) {
    const chat = await this.userChatRep.findOne({
      where: { id: chatId },
      relations: { participants: true },
    });

    const participants = chat.participants.filter((e) => e.id !== owner.id);

    const messagesToUpdate = await this.messageRep.find({
      where: {
        sender: { id: participants[0].id },
        messageStatus: olderStatus,
        receiver: { id: chat.id },
      },
    });

    const messages = await Promise.all(
      messagesToUpdate.map(async (message) => {
        message.messageStatus = newStatus;

        return await this.messageRep.save(message);
      }),
    );

    return messages;
  }
}
