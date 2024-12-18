export class Step {
  constructor(
    public stepId: string,
    public stepDescription: string,
    public expectedResult: string,
    public image: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
