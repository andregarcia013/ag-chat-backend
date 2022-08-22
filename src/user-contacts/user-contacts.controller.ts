import { Controller } from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';

@Controller('user-contacts')
export class UserContactsController {
  constructor(private readonly userContactsService: UserContactsService) {}
}
