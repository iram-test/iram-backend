import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { TemplateType } from './enums/TemplateType';
import { TestType } from './enums/TestType';

export declare class TestCase {
    constructor(
        testCaseId: string,
        title: string,
        collection: string,
        folderId: string,
        templateType: TemplateType,
        testType: TestType,
        priority: Priority,
        description: string,
        timeEstimation: string,
        reference: string | null,
        createdAt: Date,
        updatedAt: Date,
        projectId: string,
        status: Status,
        assignedUserId: string,
        comment: string,
        elapsedTime: string,
        defects: string,
        version: string,
        step: string
    );

    testCaseId: string;
    title: string;
    collection: string;
    folderId: string;
    templateType: TemplateType;
    testType: TestType;
    priority: Priority;
    description: string;
    timeEstimation: string;
    reference: string | null;
    createdAt: Date;
    updatedAt: Date;
    projectId: string;
    status: Status;
    assignedUserId: string;
    comment: string;
    elapsedTime: string;
    defects: string;
    version: string;
    step: string;
}
