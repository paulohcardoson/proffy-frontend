import React, { PropsWithChildren } from "react";
import { IProps } from "./types/props";

const Button: React.FC<PropsWithChildren<IProps>> = ({
	children,
	disabled,
	loading,
	onClick,
}) => {
	const handleClick = () => {
		if (loading || disabled || !onClick) return;

		onClick();
	};

	return (
		<button
			className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-dark"
			style={{
				opacity: disabled || loading ? 0.7 : 1,
				cursor: disabled || loading ? "not-allowed" : "pointer",
			}}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
