import faker from "@faker-js/faker";
import { Factory } from "fishery";
import { TestDataSource } from "../../data-source";
import { User } from "../../entity/user";

export const userFactory = Factory.define<User>(({ onCreate, sequence }) => {
  const user = new User();
  user.id = sequence
  user.firstName = faker.name.firstName()
  user.lastName = faker.name.lastName()

  onCreate(user => TestDataSource.manager.save(user))

  return user;
})