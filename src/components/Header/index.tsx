import React, { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "@base/redux/hooks";

// Assets
import backArrowSvg from "@icons/back.svg";
import proffyLogoSvg from "@images/logo.svg";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Components
import ContentContainer from "../ContentContainer";
import ProfileInfo from "./components/ProfileInfo";

// Types
import { IHeaderProps } from "./props";
import { authActions } from "@base/redux/states/auth";

const Header: React.FC<PropsWithChildren<IHeaderProps>> = ({
	backToLink,
	title,
	subtitle,
	children,
}) => {
	// Navigate
	const navigate = useNavigate();

	const profile = useAppSelector((state) => state.auth.profile);
	const dispatch = useAppDispatch();

	const logOut = () => {
		dispatch(authActions.logOut());
		navigate("/");
	};

	return (
		<header className="flex flex-col">
			<div className="relative w-full h-52 bg-primary-light flex flex-col items-center">
				<div className="w-4/5 max-w-[1000px] py-5 flex justify-between">
					<Link to={backToLink || "/"}>
						<img src={backArrowSvg} className="w-10" />
					</Link>

					<div className="flex items-center">
						{profile && (
							<div className="flex items-center">
								<button onClick={logOut}>
									<FontAwesomeIcon
										className="text-lg text-white hover:text-white/50"
										icon={faRightFromBracket}
									/>
								</button>

								<div className="w-2.5" />

								<Link to={"/profile/me"}>
									<ProfileInfo {...{ ...profile }} />
								</Link>
							</div>
						)}

						<div className="w-2.5" />

						<Link to="/">
							<img
								src={proffyLogoSvg}
								className="h-5 transition-all hover:opacity-60"
							/>
						</Link>
					</div>
				</div>

				<ContentContainer>
					<h2 className="text-3xl text-white font-bold">{title}</h2>
					<p className="text-base text-text-in-primary mt-2.5">{subtitle}</p>
				</ContentContainer>
			</div>

			<div className="relative w-full bg-primary-light flex flex-col">
				{children}
			</div>
		</header>
	);
};

export default Header;
