import React from "react";

interface IProps {
	amount: number | undefined;
}

const ConnectionCounter: React.FC<IProps> = ({ amount }) => {
	if (typeof amount === "undefined") {
		return (
			<span className="text-text-in-primary text-center font-semibold md:text-right md:text-xs">
				Carregando...
			</span>
		);
	}

	return (
		<span className="text-text-in-primary text-center font-semibold md:text-right md:text-xs">
			Total de {amount} conexões já realizadas
		</span>
	);
};

export default ConnectionCounter;
