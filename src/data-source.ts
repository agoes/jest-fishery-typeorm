import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/task"
import { User } from "./entity/user"

export const TestDataSource = new DataSource({
    type: "sqlite",
    database: "db",
    synchronize: true,
    logging: false,
    entities: [User, Task],
})