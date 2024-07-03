import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

// Etc
import "react-phone-number-input/style.css";
import api from "@base/config/api";
import schema from "./validations/schema";

// Components
import ContentContainer from "@base/components/ContentContainer";
import Header from "@base/components/Header";
import LabeledInput from "@base/components/LabeledInput";
import Button from "@base/components/Button";

// Types
import { IInputsList } from "./types/inputs-list";
import { ISessionCreationResponse } from "./types/session-creation-response";
import { IProfile } from "@base/types/profile";
import { toast } from "react-toastify";
import { useAppDispatch } from "@base/redux/hooks";
import { authActions } from "@base/redux/states/auth";
import generateAuthorizationHeader from "@base/utils/generateAuthorizationHeader";
import { isAxiosError } from "axios";
import toastConfig from "@base/config/toast";
import { IErrorResponse } from "@base/config/api/responses/error";

const Login: React.FC = () => {
	// Redux
	const appDispatch = useAppDispatch();

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
		},
		resolver: joiResolver(schema),
	});

	const signIn = async ({ email, password }: IInputsList) => {
		const { data } = await api.post<ISessionCreationResponse>(
			"/sessions/create",
			{
				email,
				password,
			},
		);

		return data;
	};

	const getProfileInfo = async (token: string) => {
		const { data } = await api.get<IProfile>("/profiles/me", {
			headers: {
				Authorization: generateAuthorizationHeader(token),
			},
		});

		return data;
	};

	const onSubmit: SubmitHandler<IInputsList> = async (data) => {
		try {
			const { token } = await signIn(data);
			const profile = await getProfileInfo(token);

			toast.success(
				"Login realizado com sucesso. Você será redirecionado em 5 segundos",
				toastConfig,
			);

			appDispatch(
				authActions.logIn({
					token,
					profile,
				}),
			);

			// Auto navigate to profile
			setTimeout(
				() => navigate("/give-classes"),
				toastConfig.autoClose as number,
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
				title="Bem vindo de volta"
				subtitle="Faça login para ver gerenciar suas aulas."
			/>

			<main className="w-full flex justify-center">
				<ContentContainer>
					<form
						className="relative w-full -top-5 bg-white rounded-md self-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="px-10 py-12">
							<h2 className="text-2xl font-semibold">Faça login</h2>

							<div className="py-5">
								<LabeledInput.Container
									name="email"
									label="Email"
									border={true}
									labelColor="text-complement"
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
									border={true}
									labelColor="text-complement"
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

								<br />

								<Link to={"/forgot-password"}>
									<span className="text-sm transition text-text-complement hover:text-primary-darker hover:underline">
										Esqueceu sua senha?
									</span>
								</Link>
							</div>

							<div className="flex items-center justify-between w-full">
								<Link to="/register">
									<span className="text-primary-dark underline hover:text-primary-darker">
										Não tenho uma conta
									</span>
								</Link>

								<Button loading={isSubmitting} disabled={!isValid}>
									<span className="text-white font-semibold">Enviar</span>
								</Button>
							</div>
						</div>
					</form>
				</ContentContainer>
			</main>
		</div>
	);
};

export default Login;
