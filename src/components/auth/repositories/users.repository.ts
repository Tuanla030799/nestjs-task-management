import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({ email, password: hashPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // dublicate email
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
