import { Module } from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';
import { UserContactsController } from './user-contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContact } from './entities/user-contact.entity';

@Module({
  controllers: [UserContactsController],
  providers: [UserContactsService],
  imports: [TypeOrmModule.forFeature([UserContact])],
})
export class UserContactsModule {}
