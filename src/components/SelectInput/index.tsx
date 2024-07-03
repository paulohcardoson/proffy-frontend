import React from "react";
import Select from "react-select";
import { IProps } from "./types";

const SelectInput: React.FC<IProps> = ({ height = 32, ...props }) => {
	return (
		<Select
			{...{ ...props }}
			styles={{
				control: (base) => ({
					...base,
					height,
					border: "none",
					minHeight: 32,
					background: "transparent",
					boxShadow: "none",
				}),
				input: (base) => ({
					...base,
					height,
					margin: 0,
					border: "none",
				}),
				valueContainer: (base) => ({
					...base,
					height,
					padding: "0 0.5rem",
				}),
				indicatorsContainer: (base) => ({
					...base,
					height,
				}),
				option: (base, state) => {
					let backgroundColor = base.backgroundColor;

					if (state.isSelected) backgroundColor = "rgb(var(--color-primary))";

					if (!state.isSelected && state.isFocused)
						backgroundColor = "rgb(var(--color-background))";

					return {
						...base,
						backgroundColor,
					};
				},
				menuList: (base) => ({
					...base,
					backgroundColor: "rgb(var(--color-input-background))",
				}),
			}}
		/>
	);
};

export default SelectInput;
