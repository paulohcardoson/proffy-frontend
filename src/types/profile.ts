export interface IProfile {
	id: string;
	name: string;
	bio: string;
	avatar: string | null;
	phoneNumber: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
