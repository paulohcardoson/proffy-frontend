import { IClassSchedule } from "./class-schedule";
import { IProfile } from "./profile";

export interface IClass {
	id: string;
	subject: string;
	cost: number;
	profileId: IProfile["id"];
	createdAt: Date;
	updatedAt: Date;
	profile: IProfile;
	classSchedule: IClassSchedule[];
}
