import React from "react";

// Types
import { IProfile } from "@base/types/profile";
import ProfilePicture from "@base/components/ProfilePicture";

const ProfileInfo: React.FC<IProfile> = ({ avatar, name }) => {
	return (
		<div className="flex items-center p-1.5 border-2 border-solid border-primary-lighter rounded-md">
			<ProfilePicture size={25} source={avatar} />

			<span className="ml-1.5 text-text-in-primary font-medium">{name}</span>
		</div>
	);
};

export default ProfileInfo;
