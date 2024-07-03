import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Assets
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Types
import { IProps } from "./types";

const DefaultIcon: React.FC<IProps> = ({ size }) => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<FontAwesomeIcon
				icon={faUser}
				className="text-text-in-primary"
				style={{ fontSize: size }}
			/>
		</div>
	);
};

export default DefaultIcon;
