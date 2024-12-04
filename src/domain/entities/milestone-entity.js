export class Milestone {
  constructor(
    milestoneID,
    name,
    parentId,
    description,
    startDate,
    endDate,
    status,
    createdAt,
    updatedAt,
  ) {
    this.milestoneID = milestoneID;
    this.name = name;
    this.parentId = parentId;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
