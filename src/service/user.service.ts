import { Repository, MoreThan } from 'typeorm';
import { User } from '../entity/user';

export class UserService {
  constructor(private repository: Repository<User>) {}

  async getAllWithPagination(options: { perPage: number, afterId?: number }): Promise<User[]> {
    const { perPage, afterId } = options;
    const users = await this.repository.find({
      take: perPage,
      where: {
        id: MoreThan(afterId || 0),
      },
    });

    return users;
  }

  async getByID(id: number): Promise<User|null> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    return user;
  }
}