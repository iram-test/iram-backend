import { DataSource } from "typeorm";
import { User } from "../domain/entities/user-entity";
import { Folder } from "../domain/entities/folder-entity";
import { Milestone } from "../domain/entities/milestone-entity";
import { Organization } from "../domain/entities/organization-entity";
import { OrganizationUserAssociation } from "../domain/entities/organization-user-association";
import { Project } from "../domain/entities/project-entity";
import { ProjectUserAssociation } from "../domain/entities/project-user-association";
import { Step } from "../domain/entities/step-entity";
import { TestCase } from "../domain/entities/test-case-entity";
import { TestReport } from "../domain/entities/test-report-entity";
import { TestRun } from "../domain/entities/test-run-entity";
import { TestRunStep } from "../domain/entities/test-run-step-entity";
import { config } from "../configs/index";

export const PostgresDataSource: DataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: parseInt(config.db.port, 10),
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  entities: [
    Folder,
    Milestone,
    Organization,
    OrganizationUserAssociation,
    Project,
    ProjectUserAssociation,
    Step,
    TestCase,
    TestReport,
    TestRun,
    TestRunStep,
    User,
  ],
  subscribers: [],
  migrations: [],
});
