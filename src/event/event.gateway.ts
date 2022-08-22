import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/ws.guard';
import { UserChatsService } from '../user-chats/user-chats.service';
import { WsContext } from 'src/decorators/ws-context.decorator';
import { MessagesService } from '../messages/messages.service';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({ cors: true })
export class EventGateway {
  constructor(
    private readonly userChatServices: UserChatsService,
    private readonly messageService: MessagesService,
    private configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('user-got-chat')
  async userGotChat(@ConnectedSocket() client, @WsContext() ctx) {
    const data = ctx.getData();
    console.log(ctx.getData());
    const messages = await this.messageService.updateMessagesStatus(
      data.chatId,
      data.user,
      1,
      2,
    );

    this.server.emit(`chat-user-${data.chatId}-update-chats-status`, messages);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('user-read-chat')
  async userReadChat(@ConnectedSocket() client, @WsContext() ctx) {
    const data = ctx.getData();
    console.log(ctx.getData());
    const messages = [
      ...(await this.messageService.updateMessagesStatus(
        data.chatId,
        data.user,
        1,
        2,
      )),
      ...(await this.messageService.updateMessagesStatus(
        data.chatId,
        data.user,
        2,
        3,
      )),
    ];

    this.server.emit(`chat-user-${data.chatId}-update-chats-status`, messages);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('sendMessage')
  async createNewEmptyChat(@ConnectedSocket() client, @WsContext() ctx) {
    const data = await this.messageService.save(ctx.getData());
    const sockets = Array.from(
      this.server.sockets.sockets.entries(),
      ([name, value]) => value,
    );

    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const toNotify = sockets.filter((e) => {
      const authToken = e.handshake.headers.authorization.split('Bearer ')[1];
      const jwtPayload = jwt.verify(authToken, jwtSecret);
      return data.participants.some(
        (e) => e.id === parseInt(jwtPayload.sub.toString()),
      );
    });

    toNotify.map((socket) => {
      const authToken =
        socket.handshake.headers.authorization.split('Bearer ')[1];
      const jwtPayload = jwt.verify(authToken, jwtSecret);

      data.chat.participants = data.participants.filter((e) => {
        return e.id != parseInt(jwtPayload.sub.toString());
      });
      data.message['isFromMe'] =
        parseInt(jwtPayload.sub.toString()) === data.message.sender.id;
      socket.emit('new-message', { message: data.message, chat: data.chat });
    });
  }
}
