import React from "react";
import { Link } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { joiResolver } from "@hookform/resolvers/joi";
import { isAxiosError } from "axios";

// Etc
import api from "@base/config/api";
import schema from "./validations/schema";

// Config
import toastConfig from "@base/config/toast";

// Components
import Button from "@base/components/Button";
import ContentContainer from "@base/components/ContentContainer";
import Header from "@base/components/Header";
import LabeledInput from "@base/components/LabeledInput";

// Types
import { IInputsList } from "./types/inputs-list";
import { IErrorResponse } from "@base/config/api/responses/error";

const ForgotPassword: React.FC = () => {
	// React Hook Form
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<IInputsList>({
		defaultValues: {
			email: "",
		},
		resolver: joiResolver(schema),
	});

	const recoverPassword = async (data: IInputsList) => {
		await api.post("/forgot-password", data);
	};

	const onSubmit: SubmitHandler<IInputsList> = async (data) => {
		try {
			await recoverPassword(data);

			toast.success(
				`Email de recuperação enviado para ${data.email}`,
				toastConfig,
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
				title="Esqueceu sua senha?"
				subtitle="Enviaremos um email de recuperação para o email inserido"
			/>

			<main className="w-full flex justify-center">
				<ContentContainer>
					<form
						className="relative w-full -top-5 bg-white rounded-md self-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="px-10 py-12">
							<h2 className="text-2xl font-semibold">Recuperação</h2>

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
							</div>

							<div className="flex items-center justify-between w-full">
								<Link to="/login">
									<span className="text-primary-dark underline hover:text-primary-darker">
										Voltar para login
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

export default ForgotPassword;
