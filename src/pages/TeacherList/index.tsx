import React, { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// API
import api from "@base/config/api";

// Assets
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Data
import subjects from "@base/data/subjects";

// Components
import SelectInput from "@base/components/SelectInput";
import Header from "@base/components/Header";
import ContentContainer from "@base/components/ContentContainer";
import LabeledInput from "@base/components/LabeledInput";
import ClassItem from "./components/ClassItem";

// Types
import { IClass } from "@base/types/class";
import { IInputsList } from "./types/inputs-list";
import { IOption } from "@base/components/SelectInput/types";
import NoClassesAvailable from "./components/NoClassesAvailable";
import Loading from "./components/Loading";
import { week_days } from "@base/data/week_days";

const subjectOptions: IOption[] = subjects.map((subject) => ({
	label: subject,
	value: subject,
}));

const TeacherList: React.FC = () => {
	// Ref
	const submitButtonRef = useRef<HTMLButtonElement>(null);

	// React Hook Form
	const { control, handleSubmit } = useForm<IInputsList>({
		defaultValues: {
			subject: subjects.find((subject) => subject === "Matemática") as string,
			week_day: dayjs().day() + 1,
			time: dayjs().format("HH:mm"),
		},
	});

	// States
	const [classes, setClasses] = useState<IClass[]>([]);
	const [isLoading, setLoadingState] = useState<boolean>(false);

	const searchClasses = async ({ subject, week_day, time }: IInputsList) => {
		const { data } = await api.get<IClass[]>("/classes", {
			params: {
				subject,
				week_day,
				time,
			},
		});

		return data;
	};

	const onSubmit: SubmitHandler<IInputsList> = async ({
		subject,
		week_day,
		time,
	}) => {
		try {
			setClasses([]);
			setLoadingState(true);

			const classes = await searchClasses({ subject, week_day, time });

			setClasses(classes);
		} finally {
			setLoadingState(false);
		}
	};

	useEffect(() => {
		submitButtonRef.current?.click();
	}, []);

	return (
		<div className="flex flex-col">
			<Header title="Estes são os proffys disponíveis" backToLink="/">
				<div className="w-full flex justify-center">
					<ContentContainer>
						<form
							className="relative z-10 -top-10 w-full self-center md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-2/3"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,40px] gap-2.5">
								<LabeledInput.Container name="subject" label="Matéria">
									<Controller
										control={control}
										name="subject"
										render={({ field }) => (
											<SelectInput
												id="subject"
												{...{ ...field, ref: null }}
												placeholder="Selecione a matéria"
												options={subjectOptions}
												value={subjectOptions.find(
													(option) => option.value === field.value,
												)}
												onChange={(state) => {
													if (state)
														field.onChange({
															target: { value: state.value },
														});
												}}
											/>
										)}
									/>
								</LabeledInput.Container>

								<LabeledInput.Container label="Dia da semana" name="week_day">
									<Controller
										name="week_day"
										control={control}
										render={({ field }) => (
											<SelectInput
												id="week_day"
												{...{ ...field, ref: null }}
												placeholder="Selecione o dia da semana"
												options={week_days}
												value={week_days.find(
													(option) => option.value === field.value.toString(),
												)}
												onChange={(state) => {
													if (state)
														field.onChange({
															target: { value: state.value },
														});
												}}
											/>
										)}
									/>
								</LabeledInput.Container>

								<LabeledInput.Container label="Hora" name="time">
									<Controller
										name="time"
										control={control}
										render={({ field }) => (
											<LabeledInput.Input
												id="time"
												type="time"
												{...{ ...field, ref: null }}
											/>
										)}
									/>
								</LabeledInput.Container>

								<div className="flex">
									<button
										ref={submitButtonRef}
										type="submit"
										value="Filtrar"
										className="w-full h-[36px] rounded-md bg-secundary self-end hover:bg-secundary-dark transition-all"
									>
										<FontAwesomeIcon className="text-white" icon={faSearch} />
									</button>
								</div>
							</div>
						</form>
					</ContentContainer>
				</div>
			</Header>

			<main className="w-full flex flex-col items-center py-10">
				<ContentContainer>
					{classes.map(({ id: classId, profile, subject, cost }) => (
						<div key={classId} className="mb-2">
							<ClassItem
								name={profile.name}
								subject={subject}
								avatar={profile.avatar}
								description={profile.bio}
								phoneNumber={profile.phoneNumber}
								pricePerHour={cost}
							/>
						</div>
					))}
				</ContentContainer>

				<div className="h-[calc(100vh/2)] flex items-center justify-center">
					{isLoading && <Loading />}
					{!isLoading && classes.length === 0 && <NoClassesAvailable />}
				</div>
			</main>
		</div>
	);
};

export default TeacherList;
