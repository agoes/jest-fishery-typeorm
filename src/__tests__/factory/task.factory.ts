import faker from "@faker-js/faker"
import { Factory } from "fishery"
import { TestDataSource } from "../../data-source"
import { Task } from "../../entity/task"
import { TaskStatuses } from "../../enums/index."

class TaskFactory extends Factory<Task> {
  withStatus(status: TaskStatuses) {
    return this
      .params({ status })
      .afterBuild(task => console.log(`Task created with status`, task))
  }
}

export const taskFactory = TaskFactory.define(({ onCreate, sequence }) => {
  const task = new Task();
  task.id = sequence
  task.title = faker.word.verb()
  task.status = TaskStatuses.TODO

  onCreate(task => TestDataSource.manager.save(task))

  return task;
})