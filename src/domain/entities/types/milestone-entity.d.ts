import { MilestoneStatus } from './enums/milestone-status';

export declare class Milestone {
	constructor(
		milestoneID: string,
		name: string,
		parentId: string | null,
		description: string,
		startDate: Date | null,
		endDate: Date | null,
		status: MilestoneStatus,
		createdAt: Date,
		updatedAt: Date
	);

	milestoneID: string;
	name: string;
	parentId: string | null;
	description: string;
	startDate: Date | null;
	endDate: Date | null;
	status: MilestoneStatus;
	createdAt: Date;
	updatedAt: Date;
}
