import React, { InputHTMLAttributes } from "react";

export type TInputPropsType = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<TInputPropsType> = (props) => (
	<input className="w-full p-2 outline-none bg-transparent" {...props} />
);

export default Input;
