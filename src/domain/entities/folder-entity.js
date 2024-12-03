export class Folder {
	constructor(folderId, name, description, createdAt, updatedAt, projectId) {
		this.folderId = folderId;
		this.name = name;
		this.description = description;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.projectId = projectId;
	}
}
