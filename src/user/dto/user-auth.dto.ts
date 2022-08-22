import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDTO {
  @ApiProperty({
    description:
      'Username, can be E-mail, Phone number, or just a custom username',
  })
  username: string;

  @ApiProperty({
    description: 'User password',
  })
  password: string;
}
