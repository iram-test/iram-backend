export class Project {
  constructor(
    public projectId: string,
    public name: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
