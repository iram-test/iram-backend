export declare class TestReport {
    constructor(
        testReportId: string,
        name: string,
        reference: string | null,
        milestoneId: string | null,
        description: string,
        assignedUserId: string | null,
        testCaseId: string | string[], // Може бути один або кілька тестових кейсів
        folderId: string | null // optional
    );

    testReportId: string;
    name: string;
    reference: string | null;
    milestoneId: string | null;
    description: string;
    assignedUserId: string | null;
    testCaseId: string | string[];
    folderId: string | null;
}
