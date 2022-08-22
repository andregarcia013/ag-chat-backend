import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { UserChat } from '../../user-chats/entities/user-chat.entity';

export class CreateMessageDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  sender: User;

  @ApiProperty()
  receiver: UserChat;

  @ApiProperty()
  messageType: string;

  @ApiProperty()
  attach: string;

  @ApiProperty()
  idRef: string;
}
