import { UserEntity } from '../../src/components/auth/entities/user.entity';

import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

export default class TaskTableSeeder {
  async up(connection: Connection): Promise<any> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const seed = [
      {
        email: 'tuan221762@nuce.edu.vn',
        password: await bcrypt.hash('Aa@123456', salt),
      },
      {
        email: 'tuanla0307@gmail.com',
        password: await bcrypt.hash('Aa@123456', salt),
      },
    ];

    const users = seed.map((item) => {
      const user = new UserEntity();
      user.email = item.email;
      user.password = String(item.password);
      return user;
    });

    await connection.manager.save(users);
  }
}
