import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  // async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.usersRepository.createUser(authCredentialsDto);
  // }
}
