import React from "react";
import { PropsWithChildren } from "react";

export const maxWidth = 700;

const ContentContainer: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="w-4/5 md:w-3/5 relative" style={{ maxWidth }}>
			{children}
		</div>
	);
};

export default ContentContainer;
