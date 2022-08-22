import { Test, TestingModule } from '@nestjs/testing';
import { UserChatsService } from './user-chats.service';

describe('UserChatsService', () => {
  let service: UserChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChatsService],
    }).compile();

    service = module.get<UserChatsService>(UserChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
