import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserChatsService } from './user-chats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user-chats')
export class UserChatsController {
  constructor(private readonly userChatsService: UserChatsService) {}
  @Get()
  getUserChats(@Request() req) {
    return this.userChatsService.getUserChats(req.user.userId);
  }
}
