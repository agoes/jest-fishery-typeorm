import faker from "@faker-js/faker"
import { Factory } from "fishery"
import { Task } from "../../entity/task"
import { TaskStatuses } from "../../enums/index."
import { taskRepository } from "../../repository"

class TaskFactory extends Factory<Task> {
  withStatus(status: TaskStatuses) {
    return this
      .params({ status })
      .afterBuild(task => console.log(`Task created with status`, task))
  }
}

export const taskFactory = TaskFactory.define(({ onCreate, sequence }) => {
  const task = {
    id: sequence,
    title: faker.word.verb(),
    status: TaskStatuses.TODO,
  } as Task;

  onCreate(() => taskRepository.save(task))

  return task;
})