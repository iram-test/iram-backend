import { DataSource } from "typeorm";
import { UserEntity } from "../infrastructure/db/entities/user-entity";
import { FolderEntity } from "../infrastructure/db/entities/folder-entity";
import { MilestoneEntity } from "../infrastructure/db/entities/milestone-entity";
import { OrganizationEntity } from "../infrastructure/db/entities/organization-entity";
import { OrganizationUserAssociationEntity } from "../infrastructure/db/entities/organization-user-association-entity";
import { ProjectEntity } from "../infrastructure/db/entities/project-entity";
import { ProjectUserAssociationEntity } from "../infrastructure/db/entities/project-user-association-entity";
import { StepEntity } from "../infrastructure/db/entities/step-entity";
import { TestCaseEntity } from "../infrastructure/db/entities/test-case-entity";
import { TestReportEntity } from "../infrastructure/db/entities/test-report-entity";
import { TestRunEntity } from "../infrastructure/db/entities/test-run-entity";
import { TestRunStepEntity } from "../infrastructure/db/entities/test-run-step-entity";
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
    FolderEntity,
    MilestoneEntity,
    OrganizationEntity,
    OrganizationUserAssociationEntity,
    ProjectEntity,
    ProjectUserAssociationEntity,
    StepEntity,
    TestCaseEntity,
    TestReportEntity,
    TestRunEntity,
    TestRunStepEntity,
    UserEntity,
  ],
  subscribers: [],
  migrations: [],
});
