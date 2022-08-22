import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserAuthDTO } from './dto/user-auth.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>,
  ) {}
  async auth(userAuthDTO: UserAuthDTO) {
    const foundUser = await this.userRep.findOneBy({
      username: userAuthDTO.username,
    });

    let user: User;

    if (!foundUser) {
      userAuthDTO.password = await bcrypt.hash(userAuthDTO.password, 12);
      user = await this.userRep.save(userAuthDTO);
      return user;
    }

    if (bcrypt.compare(userAuthDTO.password, foundUser.password)) {
      return foundUser;
    }

    throw new HttpException('Unauthrorized', 401);
  }

  async findUser(username: string) {
    const users = await this.userRep.find({
      where: { username: Like(`%${username}%`) },
    });

    return users;
  }

  async findUserById(id: number) {
    return await this.userRep.findOne({
      where: { id: id },
    });
  }

  async findOneUser(username: string) {

    const user = await this.userRep.findOne({
      where: { username: username },
    });

    return user;
  }
}
