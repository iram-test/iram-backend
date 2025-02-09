import { DataSource } from "typeorm";
import { UserEntity } from "../infrastructure/db/entities/user-entity";
import { config } from "../configs/index";
import { SectionEntity } from "../infrastructure/db/entities/section-entity";
import { SubSectionEntity } from "../infrastructure/db/entities/subsection-entity";
import { MilestoneEntity } from "../infrastructure/db/entities/milestone-entity";
import { OrganizationEntity } from "../infrastructure/db/entities/organization-entity";
import { OrganizationUserAssociationEntity } from "../infrastructure/db/entities/organization-user-association-entity";
import { ProjectEntity } from "../infrastructure/db/entities/project-entity";
import { StepEntity } from "../infrastructure/db/entities/step-entity";
import { TestCaseEntity } from "../infrastructure/db/entities/test-case-entity";
import { TestReportEntity } from "../infrastructure/db/entities/test-report-entity";
import { TestRunEntity } from "../infrastructure/db/entities/test-run-entity";

export const PostgresDataSource: DataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: parseInt(config.db.port, 10),
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  entities: [
    SectionEntity,
    SubSectionEntity,
    MilestoneEntity,
    OrganizationEntity,
    OrganizationUserAssociationEntity,
    ProjectEntity,
    StepEntity,
    TestCaseEntity,
    TestReportEntity,
    TestRunEntity,
    UserEntity,
  ],
  subscribers: [],
  migrations: [],
});
