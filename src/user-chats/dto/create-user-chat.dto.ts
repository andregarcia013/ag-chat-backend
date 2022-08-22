import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class CreateUserChatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  participants: User[];
}
