import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from '../../base-entity/base-entity';

@Entity('users_contacts')
export class UserContact extends BaseEntity {
  @Column()
  name: string;

  @Column()
  identifier: string;

  @ManyToOne(() => User, (user) => user.userContacts)
  owner: User;
}
