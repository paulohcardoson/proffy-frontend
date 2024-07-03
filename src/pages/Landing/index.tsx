import React, { useEffect, useState } from "react";
import ConnectionCounter from "./components/ConnectionsCounter";
import { Link } from "react-router-dom";

import logoSvg from "@images/logo.svg";
import landingSvg from "@images/landing.svg";
import studyIcon from "@icons/study.svg";
import giveClassesIcon from "@icons/give-classes.svg";
import heartIcon from "@icons/purple-heart.svg";
import api from "@base/config/api";
import { useAppSelector } from "@base/redux/hooks";

const Landing: React.FC = () => {
	// Redux
	const auth = useAppSelector((state) => state.auth);

	// App Data
	const { isAuthenticated } = auth;

	// States
	const [connectionsAmount, setConnectionsAmount] = useState<number>();

	const checkConnectionsAmount = async () => {
		const { data } = await api.get<number>("/connections/all");

		setConnectionsAmount(data);
	};

	useEffect(() => {
		checkConnectionsAmount();
	}, []);

	return (
		<div className="w-screen h-screen flex justify-center bg-primary">
			<div className="w-4/5 self-center flex flex-col">
				<div className="md:flex md:justify-between">
					<div className="flex items-center flex-col md:w-[50%] md:self-center md:items-start">
						<img src={logoSvg} alt="Proffy" className="h-20" />
						<h2 className="text-text-in-primary text-center text-base mt-2 md:text-left">
							Sua plataforma de estudos online
						</h2>
					</div>

					<div className="w-full mt-10 mb-16 md:w-[48%] md:mt-0 md:mb-0">
						<img
							src={landingSvg}
							alt="Plataforma de estudos"
							className="w-full"
						/>
					</div>
				</div>

				<div className="md:flex md:justify-between md:mt-16">
					<div className="grid grid-cols-2 gap-2 grid-rows-[50px] [&>*]:w-full [&>*]:h-full [&>*]:text-button-text [&>*]:rounded-md [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:transition-all md:w-[60%]">
						<Link
							className="bg-primary-lighter hover:bg-primary-light"
							to="/study"
						>
							<img src={studyIcon} alt="Icone de Livro" className="h-6" />
							<span className="font-archivo font-semibold ml-3">Estudar</span>
						</Link>

						<Link
							className="bg-secundary hover:bg-secundary-dark"
							to={isAuthenticated ? "/give-classes" : "/login"}
						>
							<img src={giveClassesIcon} alt="Icone de Lousa" className="h-6" />
							<span className="font-archivo font-semibold ml-3">Ensinar</span>
						</Link>
					</div>

					<div className="mt-5 flex justify-center md:w-[36%] md:mt-0 md:justify-end md:items-center">
						<ConnectionCounter amount={connectionsAmount} />

						<img src={heartIcon} alt="Icone de coração" className="w-4 ml-2" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
