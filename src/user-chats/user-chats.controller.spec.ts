import { Test, TestingModule } from '@nestjs/testing';
import { UserChatsController } from './user-chats.controller';
import { UserChatsService } from './user-chats.service';

describe('UserChatsController', () => {
  let controller: UserChatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChatsController],
      providers: [UserChatsService],
    }).compile();

    controller = module.get<UserChatsController>(UserChatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
