import * as csv from "fast-csv";
import { jsPDF } from "jspdf";
import { TestCase } from "../../domain/entities/test-case-entity";
import { CustomError } from "../../tools/custom-error";
import logger from "../../tools/logger";
import { TestRun } from "../../domain/entities/test-run-entity";
import * as xml2js from 'xml2js';
import {MultipartFile} from "@fastify/multipart";
import {TestCasePostgresRepository} from "../db/repositories/test-case-postgres-repository";
import {CreateTestCaseDTO} from "../../application/dtos/test-case-dto";

class FileService {

    private triggerDownload(data: string, filename: string, contentType: string): string {
        const blob = new Blob([data], { type: contentType });
        const url = URL.createObjectURL(blob);
        return url;
    }

    async importTestCasesFromJson(file: MultipartFile): Promise<TestCase[]> {
        try {
            const buffer = await file.toBuffer();
            const fileContent = buffer.toString('utf-8');
            const testCases: TestCase[] = JSON.parse(fileContent);

            const testCaseRepository = new TestCasePostgresRepository();

            for (const testCase of testCases) {
                try {
                    const createDto: CreateTestCaseDTO & { projectId: string; sectionId?: string | null } = {
                        title: testCase.title,
                        sectionId: testCase.sectionId,
                        projectId: testCase.projectId,
                        assignedUserId: testCase.assignedUserId || "",
                        templateType: testCase.templateType,
                        testType: testCase.testType,
                        priority: testCase.priority,
                        timeEstimation: testCase.timeEstimation,
                        description: testCase.description,
                    };

                    const savedTestCase = await testCaseRepository.addTestCase(createDto);
                    logger.info(`Successfully saved test case: ${savedTestCase.testCaseId}`);

                } catch (saveError: any) {
                    logger.error(`Error saving test case ${testCase.testCaseId}: ${saveError.message}`);
                    throw new CustomError(`Failed to save test case: ${saveError.message}`, 500);
                }
            }

            return testCases;

        } catch (error) {
            logger.error(`Error importing test cases from JSON: ${error}`);
            throw new CustomError("Failed to import test cases from JSON", 500);
        }
    }
    async exportTestCasesToJson(testCases: TestCase[]): Promise<string> {
        try {
            const jsonContent = JSON.stringify(testCases, null, 2);
            const filename = "test_cases.json";
            const contentType = "application/json";
            return this.triggerDownload(jsonContent, filename, contentType);

        } catch (error) {
            logger.error(`Error exporting test cases to JSON: ${error}`);
            throw new CustomError("Failed to export test cases to JSON", 500);
        }
    }

    async importTestCasesFromCsv(file: MultipartFile): Promise<TestCase[]> {
        try {
            const buffer = await file.toBuffer();
            const fileContent = buffer.toString('utf-8');

            const testCases: TestCase[] = await new Promise((resolve, reject) => {
                const results: TestCase[] = [];
                csv
                    .parseString(fileContent, { headers: true, ignoreEmpty: true })
                    .on("data", (data) => {
                        results.push(data as TestCase);
                    })
                    .on("end", () => {
                        resolve(results);
                    })
                    .on("error", (error) => {
                        reject(error);
                    });
            });

            const testCaseRepository = new TestCasePostgresRepository();

            for (const testCase of testCases) {
                try {
                    const createDto: CreateTestCaseDTO & { projectId: string; sectionId?: string | null } = {
                        title: testCase.title,
                        sectionId: testCase.sectionId,
                        projectId: testCase.projectId,
                        assignedUserId: testCase.assignedUserId || "",
                        templateType: testCase.templateType,
                        testType: testCase.testType,
                        priority: testCase.priority,
                        timeEstimation: testCase.timeEstimation,
                        description: testCase.description,
                    };

                    const savedTestCase = await testCaseRepository.addTestCase(createDto);
                    logger.info(`Successfully saved test case: ${savedTestCase.testCaseId}`);

                } catch (saveError: any) {
                    logger.error(`Error saving test case ${testCase.testCaseId}: ${saveError.message}`);
                    throw new CustomError(`Failed to save test case: ${saveError.message}`, 500);
                }
            }

            return testCases;

        } catch (error) {
            logger.error(`Error importing test cases from CSV: ${error}`);
            throw new CustomError("Failed to import test cases from CSV", 500);
        }
    }

    async exportTestCasesToCsv(testCases: TestCase[]): Promise<string> {
        try {
            const csvData = await new Promise<string>((resolve, reject) => {
                let csvContent = "";
                csv.format({ headers: true })
                    .on("data", (data) => {
                        csvContent += data;
                    })
                    .on("end", () => {
                        resolve(csvContent);
                    })
                    .on("error", (error) => {
                        reject(error);
                    })
                    .write(testCases);
            });

            const filename = "test_cases.csv";
            const contentType = "text/csv";

            return this.triggerDownload(csvData, filename, contentType);

        } catch (error) {
            logger.error(`Error exporting test cases to CSV: ${error}`);
            throw new CustomError("Failed to export test cases to CSV", 500);
        }
    }

    async saveTestRunToPdf(testRun: TestRun): Promise<string> {
        try {
            const doc = new jsPDF();

            doc.text(`Test Run ID: ${testRun.testRunId}`, 10, 10);
            doc.text(`Name: ${testRun.name}`, 10, 20);
            doc.text(`Description: ${testRun.description}`, 10, 30);
            doc.text(`Project ID: ${testRun.projectId}`, 10, 40);
            doc.text(`Created At: ${testRun.createdAt}`, 10, 50);
            doc.text(`Updated At: ${testRun.updatedAt}`, 10, 60);

            const pdfDataUri = doc.output('datauristring');

            return pdfDataUri;

        } catch (error) {
            logger.error(`Error saving test run to PDF: ${error}`);
            throw new CustomError("Failed to save test run to PDF", 500);
        }
    }

    async saveTestCaseToPdf(testCase: TestCase): Promise<string> {
        try {
            const doc = new jsPDF();

            doc.text(`Test Case ID: ${testCase.testCaseId}`, 10, 10);
            doc.text(`Title: ${testCase.title}`, 10, 20);
            doc.text(`Description: ${testCase.description}`, 10, 30);
            doc.text(`Project ID: ${testCase.projectId}`, 10, 40);
            doc.text(`Template Type: ${testCase.templateType}`, 10, 50);
            doc.text(`Test Type: ${testCase.testType}`, 10, 60);
            doc.text(`Priority: ${testCase.priority}`, 10, 70);
            doc.text(`Time Estimation: ${testCase.timeEstimation}`, 10, 80);
            doc.text(`Created At: ${testCase.createdAt}`, 10, 90);
            doc.text(`Updated At: ${testCase.updatedAt}`, 10, 100);

            const pdfDataUri = doc.output('datauristring');

            return pdfDataUri;

        } catch (error) {
            logger.error(`Error saving test case to PDF: ${error}`);
            throw new CustomError("Failed to save test case to PDF", 500);
        }
    }

    async exportTestCasesToXml(testCases: TestCase[]): Promise<string> {
        try {
            const builder = new xml2js.Builder();
            const xmlData = builder.buildObject({ testCases: { testCase: testCases } });

            const filename = "test_cases.xml";
            const contentType = "application/xml";
            return this.triggerDownload(xmlData, filename, contentType);

        } catch (error) {
            logger.error(`Error exporting test cases to XML: ${error}`);
            throw new CustomError("Failed to export test cases to XML", 500);
        }
    }

    async exportTestRunToXml(testRun: TestRun): Promise<string> {
        try {
            const builder = new xml2js.Builder();
            const xmlData = builder.buildObject({ testRun: testRun });

            const filename = "test_run.xml";
            const contentType = "application/xml";
            return this.triggerDownload(xmlData, filename, contentType);

        } catch (error) {
            logger.error(`Error exporting test run to XML: ${error}`);
            throw new CustomError("Failed to export test run to XML", 500);
        }
    }


    async exportTestCases(testCases: TestCase[], format: string): Promise<string> {
        switch (format.toLowerCase()) {
            case "json":
                return this.exportTestCasesToJson(testCases);
            case "csv":
                return this.exportTestCasesToCsv(testCases);
            case "xml":
                return this.exportTestCasesToXml(testCases);
            default:
                throw new CustomError("Unsupported format", 400);
        }
    }

    async exportTestRun(testRun: TestRun, format: string): Promise<string> {
        switch (format.toLowerCase()) {
            case "pdf":
                return this.saveTestRunToPdf(testRun);
            case "xml":
                return this.exportTestRunToXml(testRun);
            default:
                throw new CustomError("Unsupported format", 400);
        }
    }

    async saveTestCases(testCases: TestCase[], format: string): Promise<string> {
        switch (format.toLowerCase()) {
            case "pdf":
                if (testCases.length === 1) {
                    return this.saveTestCaseToPdf(testCases[0]);
                } else {
                    throw new CustomError("PDF export requires a single test case", 400);
                }
            case "json":
                return this.exportTestCasesToJson(testCases);
            case "csv":
                return this.exportTestCasesToCsv(testCases);
            case "xml":
                return this.exportTestCasesToXml(testCases);
            default:
                throw new CustomError("Unsupported format", 400);
        }
    }
}

export default new FileService();