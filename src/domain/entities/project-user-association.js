export class ProjectUserAssociation {
	constructor(associationId, projectId, userId, projectRole, createdAt, updatedAt) {
		this.associationId = associationId;
		this.projectId = projectId;
		this.userId = userId;
		this.projectRole = projectRole;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
