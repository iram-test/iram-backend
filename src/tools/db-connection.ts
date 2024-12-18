import { DataSource } from "typeorm";
import { User } from "../infrastructure/db/user-entity";
import { Folder } from "../infrastructure/db/folder-entity";
import { Milestone } from "../infrastructure/db/milestone-entity";

export const PostgresDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "postgres",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [User, Folder, Milestone],
  subscribers: [],
  migrations: [],
});
