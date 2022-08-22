import BaseEntity from '../../base-entity/base-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserContact } from '../../user-contacts/entities/user-contact.entity';
import { UserChat } from '../../user-chats/entities/user-chat.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  accessCode: string;

  @OneToMany(() => UserContact, (userContact) => userContact.owner)
  userContacts: UserContact[];

  @ManyToMany(() => UserChat, (userChat) => userChat.participants)
  @JoinTable()
  userChats: UserChat[];
}
