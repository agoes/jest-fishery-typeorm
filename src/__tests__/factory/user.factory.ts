import faker from "@faker-js/faker";
import { Factory } from "fishery";
import { User } from "../../entity/user";
import { userRepository } from "../../repository";

export const userFactory = Factory.define<User>(({ onCreate, sequence }) => {
  const user = {
    id: sequence,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
  onCreate(() => userRepository.save(user))

  return user;
})