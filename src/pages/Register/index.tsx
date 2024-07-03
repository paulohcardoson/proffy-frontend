import React from "react";
import "react-phone-number-input/style.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { joiResolver } from "@hookform/resolvers/joi";

import schema from "./validation/schema";
import api from "@base/config/api";

// Components
import PhoneNumberInput from "react-phone-number-input/input";
import ContentContainer from "@base/components/ContentContainer";
import Header from "@base/components/Header";
import LabeledInput from "@base/components/LabeledInput";
import Button from "@base/components/Button";

// Types
import { IInputsList } from "./types/inputs-list";
import toastConfig from "@base/config/toast";
import { IErrorResponse } from "@base/config/api/responses/error";

const Register: React.FC = () => {
	// React Router
	const navigate = useNavigate();

	// React Hook Form
	const {
		control,
		handleSubmit,
		formState: { isValid, isSubmitting },
	} = useForm<IInputsList>({
		defaultValues: {
			email: "",
			password: "",
			name: "",
			bio: "",
			phone_number: "",
		},
		resolver: joiResolver(schema),
	});

	const signUp = async (data: IInputsList) => {
		await api.post("/users/create", data);
	};

	const onSubmit: SubmitHandler<IInputsList> = async (data) => {
		try {
			await signUp(data);

			toast.success(
				"Usuário criado com sucesso.\n Você será redirecionado para tela de login em 5 segundos!",
				{
					...toastConfig,
					onClose: () => {
						navigate("/login");
					},
				},
			);
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
				title="Crie uma conta"
				subtitle="Após criar sua conta, conclua o registro do seu perfil para dar aulas."
			/>

			<main className="w-full flex justify-center">
				<ContentContainer>
					<form
						className="relative w-full -top-5 bg-white rounded-md self-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="py-12 px-10">
							<h2 className="text-2xl font-semibold text-text-title">
								Cadastre-se
							</h2>

							<br />

							<LabeledInput.Container
								name="email"
								label="Email"
								labelColor="text-complement"
								border={true}
							>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<LabeledInput.Input
											type="email"
											{...{ ...field, ref: null }}
										/>
									)}
								/>
							</LabeledInput.Container>

							<br />

							<LabeledInput.Container
								name="password"
								label="Senha"
								labelColor="text-complement"
								border={true}
							>
								<Controller
									name="password"
									control={control}
									render={({ field }) => (
										<LabeledInput.Input
											type="password"
											{...{ ...field, ref: null }}
										/>
									)}
								/>
							</LabeledInput.Container>

							<div className="relative -left-10 my-8 w-[calc(100%+5rem)] h-0.5 bg-black/10" />

							<h2 className="text-2xl font-semibold text-text-title">
								Seu perfil
							</h2>

							<br />

							<LabeledInput.Container
								name="name"
								label="Nome"
								labelColor="text-complement"
								border={true}
							>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<LabeledInput.Input {...{ ...field, ref: null }} />
									)}
								/>
							</LabeledInput.Container>

							<br />

							<LabeledInput.Container
								name="phone_number"
								label="Telefone"
								labelColor="text-complement"
								border={true}
							>
								<div className="flex">
									<span className="p-2 pr-0 text-primary font-bold">+55</span>

									<Controller
										name="phone_number"
										control={control}
										render={({ field }) => (
											<PhoneNumberInput
												className="w-full p-2 bg-transparent outline-none"
												defaultCountry="BR"
												international={true}
												withCountryCallingCode={true}
												{...{ ...field, ref: null }}
											/>
										)}
									/>
								</div>
							</LabeledInput.Container>

							<br />

							<LabeledInput.Container
								name="bio"
								label="Biografia"
								labelColor="text-complement"
								border={true}
							>
								<Controller
									name="bio"
									control={control}
									render={({ field }) => (
										<LabeledInput.TextArea {...{ ...field, ref: null }} />
									)}
								/>
							</LabeledInput.Container>

							<div className="mt-7">
								<div className="flex items-center justify-between w-full">
									<Link to="/login">
										<span className="text-primary-dark underline hover:text-primary-darker">
											Já tenho uma conta
										</span>
									</Link>

									<Button loading={isSubmitting} disabled={!isValid}>
										<span className="text-white font-semibold">Enviar</span>
									</Button>
								</div>
							</div>
						</div>
					</form>
				</ContentContainer>
			</main>
		</div>
	);
};

export default Register;
