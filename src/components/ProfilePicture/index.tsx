import React from "react";

// Components
import Avatar from "./components/Avatar";
import DefaultIcon from "./components/DefaultIcon";

// Types
import { IProps } from "./types";

const ProfilePicture: React.FC<IProps> = ({ source, size }) => {
	return (
		<div
			className="relative rounded-full bg-gradient-to-br from-primary to-primary-darker overflow-hidden"
			style={{ width: size, height: size }}
		>
			{source ? <Avatar {...{ source }} /> : <DefaultIcon size={size / 3} />}
		</div>
	);
};

export default ProfilePicture;
