import React, { TextareaHTMLAttributes } from "react";

export type TTextAreaPropsType = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	size?: number;
};

const TextArea: React.FC<TTextAreaPropsType> = ({ size = 100, ...props }) => {
	return (
		<textarea
			{...props}
			style={{ height: size }}
			className="w-full p-2 outline-none bg-transparent resize-none"
		/>
	);
};

export default TextArea;
