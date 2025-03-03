import * as csv from "fast-csv";
import { TestCase } from "../../domain/entities/test-case-entity";
import { CustomError } from "../../tools/custom-error";
import logger from "../../tools/logger";
import { TestRun } from "../../domain/entities/test-run-entity";
import * as xml2js from "xml2js";
import { MultipartFile } from "@fastify/multipart";
import { TestCasePostgresRepository } from "../db/repositories/test-case-postgres-repository";
import { CreateTestCaseDTO } from "../../application/dtos/test-case-dto";
import { TestRunPostgresRepository } from "../db/repositories/test-run-postgres-repository";

class FileService {
  private async parseCsvFile(file: MultipartFile): Promise<any[]> {
    try {
      const buffer = await file.toBuffer();
      const fileContent = buffer.toString("utf-8");

      return new Promise((resolve, reject) => {
        const results: any[] = [];
        csv
          .parseString(fileContent, { headers: true, ignoreEmpty: true })
          .on("data", (data) => {
            results.push(data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error) => {
            reject(error);
          });
      });
    } catch (error) {
      logger.error(`Error parsing CSV file: ${error}`);
      throw new CustomError("Failed to parse CSV file", 500);
    }
  }

  private async exportToCsv(data: any[]): Promise<string> {
    try {
      return new Promise<string>((resolve, reject) => {
        let csvContent = "";
        const csvStream = csv.format({ headers: true });

        csvStream.on("data", (chunk: Buffer) => {
          csvContent += chunk.toString();
        });

        csvStream.on("end", () => {
          resolve(csvContent);
        });

        csvStream.on("error", (error: Error) => {
          reject(error);
        });

        data.forEach((row) => csvStream.write(row));
        csvStream.end();
      });
    } catch (error) {
      logger.error(`Error exporting to CSV: ${error}`);
      throw new CustomError("Failed to export to CSV", 500);
    }
  }

  private async exportToXml(data: any, rootName: string): Promise<string> {
    try {
      const builder = new xml2js.Builder();
      const xmlData = builder.buildObject({ [rootName]: data });
      return xmlData;
    } catch (error) {
      logger.error(`Error exporting to XML: ${error}`);
      throw new CustomError("Failed to export to XML", 500);
    }
  }

  private async importTestCases(testCases: TestCase[]): Promise<void> {
    const testCaseRepository = new TestCasePostgresRepository();

    for (const testCase of testCases) {
      try {
        const createDto: CreateTestCaseDTO & {
          projectId: string;
          sectionId?: string | null;
        } = {
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
        logger.info(
          `Successfully saved test case: ${savedTestCase.testCaseId}`,
        );
      } catch (saveError: any) {
        logger.error(`Error saving test case: ${saveError.message}`);
        throw new CustomError(
          `Failed to save test case: ${saveError.message}`,
          500,
        );
      }
    }
  }

  async importTestCasesFromJson(file: MultipartFile): Promise<TestCase[]> {
    try {
      const buffer = await file.toBuffer();
      const fileContent = buffer.toString("utf-8");
      const testCases: TestCase[] = JSON.parse(fileContent);

      await this.importTestCases(testCases);

      return testCases;
    } catch (error) {
      logger.error(`Error importing test cases from JSON: ${error}`);
      throw new CustomError("Failed to import test cases from JSON", 500);
    }
  }

  async importTestCasesFromCsv(file: MultipartFile): Promise<TestCase[]> {
    try {
      const testCases = (await this.parseCsvFile(file)) as TestCase[];
      await this.importTestCases(testCases);
      return testCases;
    } catch (error) {
      logger.error(`Error importing test cases from CSV: ${error}`);
      throw new CustomError("Failed to import test cases from CSV", 500);
    }
  }

  async exportTestCasesToJson(testCases: TestCase[]): Promise<string> {
    try {
      return JSON.stringify(testCases, null, 2);
    } catch (error) {
      logger.error(`Error exporting test cases to JSON: ${error}`);
      throw new CustomError("Failed to export test cases to JSON", 500);
    }
  }

  async exportTestCasesToCsv(testCases: TestCase[]): Promise<string> {
    return this.exportToCsv(testCases);
  }

  async exportTestCasesToXml(testCases: TestCase[]): Promise<string> {
    const xmlData = await this.exportToXml(
      { testCase: testCases },
      "testCases",
    );
    return xmlData;
  }

  async exportTestRunsToCsv(testRuns: TestRun[]): Promise<string> {
    return this.exportToCsv(testRuns);
  }

  async exportTestRunsToXml(testRuns: TestRun[]): Promise<string> {
    const xmlData = await this.exportToXml({ testRun: testRuns }, "testRuns");
    return xmlData;
  }

  async exportTestCasesByIds(ids: string[], format: string): Promise<string> {
    const testCaseRepository = new TestCasePostgresRepository();
    const testCases = await testCaseRepository.getTestCasesByIds(ids);

    if (!testCases || testCases.length === 0) {
      throw new CustomError("No test cases found with provided IDs", 404);
    }

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

  async exportTestRunsByIds(ids: string[], format: string): Promise<string> {
    const testRunRepository = new TestRunPostgresRepository();
    const testRuns = await testRunRepository.getTestRunsByIds(ids);

    if (!testRuns || testRuns.length === 0) {
      throw new CustomError("No test runs found with provided IDs", 404);
    }

    switch (format.toLowerCase()) {
      case "json":
        return JSON.stringify(testRuns, null, 2);
      case "csv":
        return this.exportTestRunsToCsv(testRuns);
      case "xml":
        return this.exportTestRunsToXml(testRuns);
      default:
        throw new CustomError("Unsupported format", 400);
    }
  }
}

export default new FileService();
