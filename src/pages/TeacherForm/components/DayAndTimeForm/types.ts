interface IInputs {
	week_day: number;
	from: string;
	to: string;
}

export interface IProps {
	defaultValue: number;
	alreadySelectedDays: number[];
	defaultStartTime?: string;
	defaultEndTime?: string;
	onChange: (data: IInputs) => unknown;
	onRemove: () => unknown;
}
