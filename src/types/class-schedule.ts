export interface IClassSchedule {
	id: string;
	weekDay: number;
	from: number;
	to: number;
	classId: string;
	createdAt: Date;
	updatedAt: Date;
}
