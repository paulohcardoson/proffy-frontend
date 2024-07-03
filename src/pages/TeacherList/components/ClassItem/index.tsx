import React from "react";

import whatsappSvg from "@icons/whatsapp.svg";
import ProfilePicture from "@base/components/ProfilePicture";

interface IClassItemProps {
	name: string;
	subject: string;
	avatar: string | null;
	description: string;
	phoneNumber: string;
	pricePerHour: number;
}

const ClassItem: React.FC<IClassItemProps> = ({
	name,
	subject,
	avatar,
	description,
	phoneNumber,
	pricePerHour,
}) => {
	return (
		<article className="w-full bg-white border-2 border-solid border-line-in-white rounded-md">
			<div className="p-5">
				<header className="flex items-center">
					<ProfilePicture size={45} source={avatar} />

					<div className="ml-2.5">
						<strong className="font-archivo text-text-title">{name}</strong>
						<p className="text-text-complement">{subject}</p>
					</div>
				</header>

				<main className="mt-5">
					<p>{description}</p>
				</main>
			</div>

			<footer className="flex justify-between items-center bg-box-footer p-5 border-t-2 border-solid border-line-in-white rounded-b-md">
				<p className="flex flex-col">
					<span className="text-sm">Preço/Hora</span>
					<strong className="text-primary-light">
						{`R$ ${pricePerHour.toFixed(2).replace(".", ",")}`}
					</strong>
				</p>

				<a href={`whatsapp://send?phone=${phoneNumber}`}>
					<button className="flex  items-center bg-secundary rounded-md px-5 py-2.5 hover:bg-secundary-dark transition-all">
						<img src={whatsappSvg} alt="Whatsapp" className="h-5" />
						<span className="text-button-text font-archivo font-semibold ml-2.5">
							Entrar em contato
						</span>
					</button>
				</a>
			</footer>
		</article>
	);
};

export default ClassItem;
