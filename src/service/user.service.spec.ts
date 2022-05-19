import { TestDataSource } from '../data-source';
import { TestHelper } from '../__tests__/test-helper';
import { userFactory } from '../__tests__/factory/user.factory';
import { UserService } from './user.service';
import { taskFactory } from '../__tests__/factory/task.factory';
import { TaskStatuses } from '../enums/index.';
import { Task } from '../entity/task';
import { User } from '../entity/user';
import { userRepository } from '../repository';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    await TestHelper.getInstance().setUp();
    service = new UserService(userRepository);
  });

  afterEach(async () => {
    await TestHelper.getInstance().tearDown([Task, User]);
  });

  describe('getAllWithPagination', () => {
    it('get all records using perPage', async () => {
      await userFactory.createList(5);
      const actual = await service.getAllWithPagination({ perPage: 5 });
      expect(actual.length).toEqual(5);
    });

    it('get data with afterId passed', async () => {
      const [first, second] = await Promise.all([
        userFactory.createList(2),
        userFactory.createList(2),
      ]);
      const actual = await service.getAllWithPagination({
        perPage: 2,
        afterId: first[1].id,
      });
      expect(actual).toEqual(second);
    });
  });

  describe('getByID', () => {
    it('return User', async () => {
      const user = await userFactory.create();
      const actual = await service.getByID(user.id);
      expect(actual).toBeInstanceOf(User);
    });

    it('return User with tasks if any', async () => {
      const tasks = await taskFactory.withStatus(TaskStatuses.IN_PROGRESS).createList(2);
      const userWithTasks = await userFactory
        .associations({ tasks })
        .create();
      const userWithoutTasks = await userFactory.create();

      const actualWithTasks = await service.getByID(userWithTasks.id);
      expect(actualWithTasks).toBeInstanceOf(User);
      expect(actualWithTasks.tasks).toEqual(tasks);

      const actualWithoutTasks = await service.getByID(userWithoutTasks.id);
      expect(actualWithoutTasks).toBeInstanceOf(User);
      expect(actualWithoutTasks.tasks).toEqual(0);
    });

    it('return null on no result', async () => {
      const user = await userFactory.create();
      const actual = await service.getByID(user.id * 2);
      expect(actual).toBeNull();
    });
  });
});
