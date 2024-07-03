import React from "react";

const SelectImageTemplate: React.FC = () => {
	return (
		<div className="w-full h-80 flex items-center justify-center rounded-md border-2 border-dotted border-primary-dark">
			<span className="font-archivo font-semibold text-2xl text-primary-darker">
				Selecione uma imagem
			</span>
		</div>
	);
};

export default SelectImageTemplate;
