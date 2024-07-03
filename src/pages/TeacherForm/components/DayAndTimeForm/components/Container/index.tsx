import React, { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className="flex flex-col">{children}</div>;
};

export default Container;
