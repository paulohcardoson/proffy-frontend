import React from "react";

import ReactModal from "react-modal";
import { IProps } from "./types";

const Modal: React.FC<IProps> = ({ children, ...props }) => {
	return (
		<ReactModal
			{...{ ...props }}
			style={{
				content: {
					width: "70%",
					minWidth: "280px",
					top: "50%",
					left: "50%",
					right: "auto",
					bottom: "auto",
					marginRight: "-50%",
					transform: "translate(-50%, -50%)",
					borderRadius: "10px",
					...props.style?.content,
				},
				overlay: {
					backgroundColor: "rgba(0,0,0,0.5)",
					...props.style?.overlay,
				},
			}}
		>
			{children}
		</ReactModal>
	);
};

export default Modal;
