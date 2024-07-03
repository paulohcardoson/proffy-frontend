import React, { useEffect, useState } from "react";
import LabeledInput from "@base/components/LabeledInput";

// Types
import { IProps } from "./types";
import Container from "./components/Container";
import SelectInput from "@base/components/SelectInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { week_days } from "@base/data/week_days";

const DayAndTimeForm: React.FC<IProps> = ({
	alreadySelectedDays,
	defaultValue,
	onChange,
	onRemove,
	defaultStartTime = "06:00",
	defaultEndTime = "18:00",
}) => {
	// States
	const [weekDay, setWeekDay] = useState(defaultValue);
	const [startTime, setStartTime] = useState(defaultStartTime);
	const [endTime, setEndTime] = useState(defaultEndTime);

	useEffect(() => {
		onChange({ week_day: weekDay, from: startTime, to: endTime });
	}, [weekDay, startTime, endTime]);

	return (
		<div className="w-full items-center justify-between grid grid-cols-[50%,10px,1fr,5px,1fr,15px]">
			<Container>
				<LabeledInput.Container
					name="week-day-input"
					label="Dia da semana"
					labelColor="text-complement"
					border={true}
				>
					<SelectInput
						name="week-day-input"
						defaultValue={week_days.find(
							(option) => option.value === weekDay.toString(),
						)}
						onChange={(value) => {
							if (!value) return;

							const { value: optionValue } = value;

							setWeekDay(Number(optionValue));
						}}
						placeholder={null}
						options={week_days.map((option) => ({
							...option,
							isDisabled: alreadySelectedDays.includes(Number(option.value)),
						}))}
					/>
				</LabeledInput.Container>
			</Container>

			<div />

			<Container>
				<LabeledInput.Container
					name={`start-time-input-${weekDay}`}
					label="De"
					labelColor="text-complement"
					border={true}
				>
					<LabeledInput.Input
						id={`start-time-input-${weekDay}`}
						type="time"
						value={startTime}
						onChange={(event) => setStartTime(event.target.value)}
					/>
				</LabeledInput.Container>
			</Container>

			<div />

			<Container>
				<LabeledInput.Container
					name={`end-time-input-${weekDay}`}
					label="Até"
					labelColor="text-complement"
					border={true}
				>
					<LabeledInput.Input
						id={`end-time-input-${weekDay}`}
						type="time"
						value={endTime}
						onChange={(event) => setEndTime(event.target.value)}
					/>
				</LabeledInput.Container>
			</Container>

			<button
				className="h-12 cursor-pointer flex items-center justify-end self-end"
				onClick={() => onRemove()}
			>
				<FontAwesomeIcon
					className="text-red-700 hover:text-red-900"
					icon={faXmark}
				/>
			</button>
		</div>
	);
};

export default DayAndTimeForm;
