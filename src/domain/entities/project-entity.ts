import { Language } from "./enums/language";

export class Project {
  constructor(
    public projectId: string,
    public name: string,
    public language: Language | null,
    public location: Location | null,
    public description: string,
    public assignedUserId: string[] | null,
    public createdAt: string,
    public updatedAt: string,
  ) {}
}
