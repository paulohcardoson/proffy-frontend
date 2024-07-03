import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@base/redux/hooks";
import { useNavigate } from "react-router-dom";
import toastConfig from "@base/config/toast";
import api from "@base/config/api";

// Data
import subjects from "@base/data/subjects";

// Components
import CurrencyInput from "react-currency-input-field";
import Header from "@components/Header";
import ContentContainer from "@components/ContentContainer";
import LabeledInput from "@base/components/LabeledInput";
import DayAndTimeForm from "./components/DayAndTimeForm";
import SelectInput from "@base/components/SelectInput";

// Assets
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import warningSvg from "@icons/warning.svg";

// Types
import { IOption } from "@base/components/SelectInput/types";
import { IErrorResponse } from "@base/config/api/responses/error";
import { IInputsList } from "./types/inputs_list";
import { ISchedule } from "./types/schedule";

// Utils
import generateAuthorizationHeader from "@base/utils/generateAuthorizationHeader";

const subjectOptions: IOption[] = subjects.map((subject) => ({
	label: subject,
	value: subject,
}));

const TeacherForm: React.FC = () => {
	// Navigate
	const navigate = useNavigate();

	// Redux
	const { token } = useAppSelector((state) => state.auth);

	if (!token) {
		navigate("/login");
		return;
	}

	// App Data
	const [schedule, setSchedule] = useState<ISchedule[]>([
		{ week_day: 1, from: "06:00", to: "18:00" },
	]);

	// React Hook Form
	const { control, handleSubmit, reset } = useForm<IInputsList>({
		defaultValues: {
			subject: undefined,
			cost: "0,00",
		},
	});

	const addPeriodOnSchedule = () => {
		for (let i = 1; i <= 7; i++) {
			const unavailableWeekDay = schedule.find(
				(period) => period.week_day === i,
			);

			if (!unavailableWeekDay) {
				setSchedule([...schedule, { week_day: i, from: "06:00", to: "18:00" }]);
				return;
			}
		}
	};

	const removePeriodOnSchedule = (index: number) => {
		schedule.splice(index, 1);

		setSchedule([...schedule]);
	};

	const createClass = async ({ cost: costAsString, subject }: IInputsList) => {
		const cost = parseFloat(costAsString.replace(",", "."));

		await api.post<unknown>(
			"/classes/create",
			{
				cost,
				subject,
				schedule,
			},
			{
				headers: {
					Authorization: generateAuthorizationHeader(token),
				},
			},
		);
	};

	const onSubmit: SubmitHandler<IInputsList> = async (data) => {
		if (schedule.length === 0) return;

		try {
			await createClass(data);

			toast.success("Aula criada com sucesso", toastConfig);

			reset(undefined);
			setSchedule([{ week_day: 1, from: "06:00", to: "18:00" }]);
		} catch (err) {
			let message = "Ocorreu um erro, tente novamente mais tarde.";

			if (isAxiosError<IErrorResponse>(err)) {
				message = err.response!.data.message;
			}

			toast.error(message, toastConfig);
		}
	};

	return (
		<div>
			<Header
				title="Que incrivel que você quer dar aulas"
				subtitle="O primeiro passo, é preencher esse formulário de inscrição."
			/>

			<main className="w-full flex justify-center">
				<ContentContainer>
					<form
						className="relative w-full -top-5 bg-white rounded-md self-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="p-10">
							<div>
								<h2 className="text-xl font-semibold">Dados da aula</h2>

								<div className="py-5">
									<LabeledInput.Container
										name="subject"
										label="Matéria"
										labelColor="text-complement"
										border={true}
									>
										<Controller
											control={control}
											name="subject"
											render={({ field }) => (
												<SelectInput
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

									<br />

									<LabeledInput.Container
										name="cost-input"
										label="Custo por hora"
										labelColor="text-complement"
										border={true}
									>
										<div className="flex items-center">
											<label
												htmlFor="cost-input"
												className="text-primary-lighter font-semibold pl-2"
											>
												BRL
											</label>

											<Controller
												name="cost"
												control={control}
												render={({ field }) => (
													<CurrencyInput
														{...{ ...field, onChange: undefined, ref: null }}
														id={`${field.name}-input`}
														className="w-full outline-none bg-transparent p-2"
														decimalsLimit={2}
														disableAbbreviations
														decimalSeparator=","
														groupSeparator="."
														onValueChange={(value) => {
															if (value && value.length === 0) return;

															field.onChange({
																target: { value },
															});
														}}
													/>
												)}
											/>
										</div>
									</LabeledInput.Container>
								</div>
							</div>

							<div className="h-5" />

							<div>
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-semibold">
										Horários disponíveis
									</h2>

									<button
										type="button"
										className="text-primary hover:text-primary-darker"
										style={{
											opacity: schedule.length < 7 ? 1 : 0.75,
											color: "rgb(var(--color-primary))",
										}}
										onClick={(event) => {
											event.stopPropagation();

											if (schedule.length < 7) addPeriodOnSchedule();
										}}
									>
										<FontAwesomeIcon icon={faAdd} />
										<span className="pl-2.5">Adicionar horário</span>
									</button>
								</div>

								<div>
									<div className="w-full flex flex-col">
										{schedule.map((period, index) => {
											const alreadySelectedDays = schedule
												.filter((_period) => {
													return period !== _period;
												})
												.map(({ week_day }) => week_day);

											return (
												<div
													key={`${period.week_day}-${index}`}
													className="pt-5"
												>
													<DayAndTimeForm
														defaultValue={period.week_day}
														alreadySelectedDays={alreadySelectedDays}
														onChange={(data) => {
															schedule[index] = data;

															setSchedule(schedule);
														}}
														onRemove={() => removePeriodOnSchedule(index)}
														defaultStartTime={period.from}
														defaultEndTime={period.to}
													/>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>

						<footer className="px-10 py-5 border-t-2 border-solid border-line-in-white bg-box-footer">
							<div className="flex flex-col items-center justify-between md:flex-row">
								<div className="w-4/5 md:w-auto flex items-center">
									<img src={warningSvg} className="h-8" />

									<div className="text-text-complement text-xs ml-2.5">
										<h4>Importante</h4>
										<span>Preencha todos os dados</span>
									</div>
								</div>

								<div className="w-5 h-5" />

								<button className="w-full md:w-auto px-10 py-2.5 rounded-md bg-secundary hover:bg-secundary-dark">
									<span className="font-archive text-white">
										Cadastrar aula
									</span>
								</button>
							</div>
						</footer>
					</form>
				</ContentContainer>
			</main>
		</div>
	);
};

export default TeacherForm;
