import { TestDataSource } from "../data-source";
import { Task } from "../entity/task";
import { User } from "../entity/user";

export const userRepository = TestDataSource.manager.getRepository<User>(User);
export const taskRepository = TestDataSource.manager.getRepository<Task>(Task);