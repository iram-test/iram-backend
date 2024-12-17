export class Folder {
  constructor(
    public folderId: string,
    public name: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
    public projectId: string,
  ) {}
}
