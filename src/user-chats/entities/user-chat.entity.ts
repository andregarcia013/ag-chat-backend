import BaseEntity from 'src/base-entity/base-entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('user_chats')
export class UserChat extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  image: string;

  @ManyToMany(() => User, (user) => user.userChats)
  participants: User[];

  @Column()
  idRef: string;
}
