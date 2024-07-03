import { Props } from "react-select";

export interface IOption {
	value: string;
	label: string;
	isDisabled?: boolean;
}

export interface IProps extends Props<IOption, false> {
	options: IOption[];
	height?: number;
}
