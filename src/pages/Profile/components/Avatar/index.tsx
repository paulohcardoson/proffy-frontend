import React from "react";
import { IAvatarProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUser } from "@fortawesome/free-solid-svg-icons";

const Avatar: React.FC<IAvatarProps> = ({ source, onClick, canvasRef }) => {
	const Profile: React.FC<{ source: string }> = ({ source }) => {
		return <img src={source} className="w-full h-full" />;
	};

	const DefaultIcon: React.FC = () => {
		return (
			<div className="w-full h-full bg-input-background flex items-center justify-center">
				<FontAwesomeIcon icon={faUser} className="text-text-title text-3xl" />
			</div>
		);
	};

	const ChangeAvatarButton: React.FC = () => {
		return (
			<div
				className="cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-all duration-500 bg-black/20 hover:opacity-100"
				onClick={onClick}
			>
				<FontAwesomeIcon icon={faImage} className="text-white text-3xl" />
			</div>
		);
	};

	return (
		<div className="relative w-28 h-28 rounded-full border-2 border-solid border-line-in-white bg-gray-200 overflow-hidden">
			<canvas className="w-full h-full absolute top-0 left-0" ref={canvasRef} />
			{source ? <Profile {...{ source }} /> : <DefaultIcon />}
			<ChangeAvatarButton />
		</div>
	);
};

export default Avatar;
