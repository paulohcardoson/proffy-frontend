import React, { PropsWithChildren } from "react";
import { ILabeledInputContainerProps } from "./types";

export type TContainerPropsType =
	PropsWithChildren<ILabeledInputContainerProps>;

const Container: React.FC<TContainerPropsType> = ({
	name,
	label,
	labelColor = "text-in-primary",
	border = true,
	children,
}: TContainerPropsType) => {
	const color = `rgb(var(--color-${labelColor}))`;

	return (
		<div className="w-full flex flex-col">
			<label htmlFor={name} className="font-medium" style={{ color }}>
				{label}
			</label>

			<div
				className="w-full rounded-md bg-input-background text-sm font-medium mt-1 transition-all border-2 border-solid border-line-in-white focus-within:border-primary-light"
				style={{ borderColor: border ? undefined : "transparent" }}
			>
				{children}
			</div>
		</div>
	);
};

export default Container;
