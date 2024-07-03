import React, { useRef, useState } from "react";
import axios, { isAxiosError } from "axios";
import { Crop } from "react-image-crop";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@base/redux/hooks";
import "react-phone-number-input/style.css";
import "react-image-crop/dist/ReactCrop.css";

// Utils
import api from "@base/config/api";
import { getCanvasPreview } from "@base/utils/getCanvasPreview";

// Schema
import profileSchema from "./validations/profile";
import deleteProfileSchema from "./validations/delete";

// Components
import Modal from "@base/components/Modal";
import PhoneNumberInput from "react-phone-number-input/react-hook-form-input";
import Button from "@base/components/Button";
import ContentContainer from "@base/components/ContentContainer";
import Header from "@base/components/Header";
import LabeledInput from "@base/components/LabeledInput";
import SelectImageTemplate from "./components/SelectImageTemplate";
import CropImage from "./components/CropImage";
import Avatar from "./components/Avatar";

// Types
import { IDeleteProfileInputsList, IInputsList } from "./types/inputs-list";
import { IProfile } from "@base/types/profile";
import { authActions } from "@base/redux/states/auth";
import generateAuthorizationHeader from "@base/utils/generateAuthorizationHeader";
import toastConfig from "@base/config/toast";
import { joiResolver } from "@hookform/resolvers/joi";

const Profile: React.FC = () => {
	// Redux
	const auth = useAppSelector((state) => state.auth);
	const appDispatch = useAppDispatch();

	// React Router
	const navigate = useNavigate();

	// React Modal
	const [profilePictureModalOpenState, setProfilePictureModalOpenState] =
		useState(false);
	const [deleteProfileModalOpenState, setDeleteProfileModalOpenState] =
		useState(false);

	// Refs
	const avatarPreviewImageRef = useRef<HTMLImageElement>(null);
	const avatarPreviewCanvasRef = useRef<HTMLCanvasElement>(null);

	// App Data
	const profile = auth.profile;
	const token = auth.token;

	if (!profile || !token) {
		navigate("/login");
		return;
	}

	// App Data
	const [croppedAvatarDataUrl, setCroppedAvatarDataUrl] = useState<string>();
	const [avatar, setAvatar] = useState<string | null>(null);
	const [avatarCrop, setAvatarCrop] = useState<Crop>({
		unit: "px",
		width: 50,
		height: 50,
		x: 0,
		y: 0,
	});

	const openProfilePictureModal = () => setProfilePictureModalOpenState(true);
	const closeProfilePictureModal = () => setProfilePictureModalOpenState(false);

	const openDeleteProfileModal = () => setDeleteProfileModalOpenState(true);
	const closeDeleteProfileModal = () => setDeleteProfileModalOpenState(false);

	const savePreviewAndCloseModal = () => {
		getCanvasPreview(
			avatarPreviewImageRef.current as HTMLImageElement,
			avatarPreviewCanvasRef.current as HTMLCanvasElement,
			avatarCrop,
			1,
			0,
		);
		setCroppedAvatarDataUrl(avatarPreviewCanvasRef.current!.toDataURL());
		closeProfilePictureModal();
	};

	const changeProfileInfo = async ({
		name,
		bio,
		phone_number,
	}: IInputsList) => {
		const { data } = await api.put<IProfile>(
			"/profiles/me",
			{
				name,
				bio,
				phone_number,
			},
			{ headers: { Authorization: generateAuthorizationHeader(token) } },
		);

		return data;
	};

	const changeProfileAvatar = async (dataUrl: string) => {
		const { data: blob } = await axios.get(dataUrl, { responseType: "blob" });

		await api.patchForm(
			"/profiles/me/change-avatar",
			{
				avatar: blob,
			},
			{ headers: { Authorization: generateAuthorizationHeader(token) } },
		);
	};

	const deleteProfile = async ({ password }: IDeleteProfileInputsList) => {
		await api.delete("/users/me", {
			data: {
				password,
			},
			headers: {
				Authorization: generateAuthorizationHeader(token),
			},
		});
	};

	const onSubmit = async (data: IInputsList) => {
		try {
			toast.promise(
				changeProfileInfo(data),
				{
					pending: "Atualizando perfil. Aguarde...",
					error: "Algo deu errado, tente novamente mais tarde.",
					success: "Perfil alterado com sucesso.",
				},
				toastConfig,
			);

			if (croppedAvatarDataUrl) {
				await toast.promise(
					changeProfileAvatar(croppedAvatarDataUrl),
					{
						pending: "Atualizando sua foto perfil. Aguarde...",
						error: "Algo deu errado, tente novamente mais tarde.",
						success: "Foto de perfil alterado com sucesso.",
					},
					toastConfig,
				);
			}

			const { data: updatedProfile } = await api.get<IProfile>("/profiles/me", {
				headers: {
					Authorization: generateAuthorizationHeader(token),
				},
			});

			console.log(updatedProfile);
			appDispatch(
				authActions.logIn({
					token,
					profile: updatedProfile,
				}),
			);
		} catch (err) {
			toast.error(err as string, {
				theme: "colored",
			});
		}
	};

	const onSubmitDeleteAvatar = async (data: IDeleteProfileInputsList) => {
		try {
			await deleteProfile(data);

			appDispatch(authActions.logOut());

			toast.success("Perfil deletado com sucesso", {
				...toastConfig,
				onClose: () => navigate("/"),
			});
		} catch (err) {
			if (isAxiosError(err)) {
				const message = err.response?.data.message;

				toast.error(message, toastConfig);
			}
		}
	};

	// React Hook Form
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<IInputsList>({
		defaultValues: {
			name: profile?.name || "",
			phone_number: profile?.phoneNumber || "",
			bio: profile?.bio || "",
		},
		resolver: joiResolver(profileSchema),
	});
	const {
		control: deleteProfileControl,
		handleSubmit: deleteProfileHandleSubmit,
		formState: deleteProfileFormState,
	} = useForm<IDeleteProfileInputsList>({
		defaultValues: {
			password: "",
		},
		resolver: joiResolver(deleteProfileSchema),
	});

	if (!profile) {
		return <div>Carregando...</div>;
	}

	return (
		<div>
			<Header
				title="Seu perfil"
				subtitle="Este é seu perfil, é assim que seus alunos o verão."
			>
				<div className="h-10" />
			</Header>

			<main className="w-full flex justify-center">
				<ContentContainer>
					<form
						className="relative w-full -top-5 bg-white rounded-md self-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="px-10 py-12">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
								<Avatar
									source={profile.avatar || avatar}
									onClick={openProfilePictureModal}
									canvasRef={avatarPreviewCanvasRef}
								/>
							</div>

							<h2 className="text-2xl font-semibold">Seu perfil</h2>

							<div className="pt-5">
								<LabeledInput.Container
									name="name"
									label="Nome"
									labelColor="text-complement"
									border={true}
								>
									<Controller
										control={control}
										name="name"
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
									<PhoneNumberInput
										className="w-full bg-transparent outline-none p-2"
										name="phone_number"
										control={control}
										country="BR"
										withCountryCallingCode={true}
									/>
								</LabeledInput.Container>

								<br />

								<LabeledInput.Container
									name="bio"
									label="Biografia"
									labelColor="text-complement"
									border={true}
								>
									<Controller
										control={control}
										name="bio"
										render={({ field }) => (
											<LabeledInput.TextArea {...{ ...field, ref: null }} />
										)}
									/>
								</LabeledInput.Container>
							</div>

							<br />

							<div className="flex items-center justify-between w-full">
								<button
									type="button"
									className="px-6 py-2 rounded-lg transition-colors border-2 border-solid border-red-700 hover:bg-red-700 group"
									onClick={openDeleteProfileModal}
								>
									<span className="transition-colors text-red-700 group-hover:text-white font-semibold">
										Deletar perfil
									</span>
								</button>

								<Button disabled={!isValid}>
									<span className="text-white font-semibold">Enviar</span>
								</Button>
							</div>
						</div>
					</form>
				</ContentContainer>
			</main>

			<Modal
				isOpen={profilePictureModalOpenState}
				onRequestClose={closeProfilePictureModal}
			>
				<div className="flex flex-col">
					{avatar ? (
						<CropImage
							imageRef={avatarPreviewImageRef}
							avatar={avatar}
							crop={avatarCrop}
							onCropChange={setAvatarCrop}
						/>
					) : (
						<label className="cursor-pointer" htmlFor="profile-picture">
							<SelectImageTemplate />
						</label>
					)}

					<div className="flex justify-between items-center mt-2.5">
						<label
							className="block underline cursor-pointer text-primary hover:text-primary-darker"
							htmlFor="profile-picture"
						>
							<span>Selecionar arquivo</span>
						</label>

						<Button onClick={savePreviewAndCloseModal} disabled={!avatar}>
							<span className="text-white">Confirmar</span>
						</Button>
					</div>

					<input
						id="profile-picture"
						className="hidden"
						type="file"
						onChange={(event) => {
							const files = event.target.files;

							if (!files) return;

							const selectedFile = files[0];

							if (selectedFile instanceof File) {
								const fileLink = window.URL.createObjectURL(selectedFile);

								setAvatar(fileLink);
							}
						}}
					/>
				</div>
			</Modal>

			<Modal
				isOpen={deleteProfileModalOpenState}
				onRequestClose={closeDeleteProfileModal}
			>
				<form onSubmit={deleteProfileHandleSubmit(onSubmitDeleteAvatar)}>
					<h2 className="text-2xl font-semibold">Deletar perfil</h2>

					<div className="mt-2">
						<p>Para concluir a exclusão do seu perfil, digite sua senha.</p>
						<small className="text-red-700">Essa ação é irreversível</small>
					</div>

					<div className="py-5">
						<LabeledInput.Container
							name="password"
							label="Confirme sua senha"
							labelColor="text-complement"
							border={true}
						>
							<Controller
								control={deleteProfileControl}
								name="password"
								render={({ field }) => (
									<LabeledInput.Input
										{...{ ...field, ref: null }}
										type="password"
									/>
								)}
							/>
						</LabeledInput.Container>
					</div>

					<div className="flex items-center justify-between">
						<button
							type="button"
							className="px-6 py-1.5 rounded-lg transition-colors border-2 border-solid border-primary"
							style={{ opacity: deleteProfileFormState.isValid ? 1 : 0.75 }}
							onClick={closeDeleteProfileModal}
						>
							<span className="text-primary font-semibold">Cancelar</span>
						</button>

						<button
							className="px-6 py-2 rounded-lg transition-colors bg-red-700"
							style={{ opacity: deleteProfileFormState.isValid ? 1 : 0.5 }}
							onClick={openDeleteProfileModal}
						>
							<span className="transition-colors text-white font-semibold">
								Confirmar
							</span>
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default Profile;
