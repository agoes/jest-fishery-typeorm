import faker from "@faker-js/faker";
import { Factory } from "fishery";
import { User } from "../../entity/user";
import { userRepository } from "../../repository";

export const userFactory = Factory.define<User>(({ onCreate, sequence, associations }) => {
  const user = {
    id: sequence,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    tasks: associations.tasks,
  }
  onCreate(() => userRepository.save(user))

  return user;
})