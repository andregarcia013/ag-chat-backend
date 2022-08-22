import BaseEntity from 'src/base-entity/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserChat } from '../../user-chats/entities/user-chat.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  sender: User;

  @ManyToOne(() => UserChat)
  receiver: UserChat;

  @Column()
  messageType: string;

  @Column()
  attach: string;

  @Column()
  idRef: string;

  @Column()
  messageStatus: number;
}
