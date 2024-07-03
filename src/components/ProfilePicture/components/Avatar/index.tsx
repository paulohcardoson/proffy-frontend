import React from "react";

// Types
import { IProps } from "./types";

const Avatar: React.FC<IProps> = ({ source }) => {
	return <img className="w-full" src={source} />;
};

export default Avatar;
