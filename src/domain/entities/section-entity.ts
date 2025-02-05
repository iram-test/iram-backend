export class Section {
  constructor(
    public sectionId: string,
    public subsectionId: string[] | null,
    public name: string,
    public description: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
