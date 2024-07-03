import React from "react";

import Container, { TContainerPropsType } from "./components/Container";
import Input, { TInputPropsType } from "./components/Input";
import TextArea, { TTextAreaPropsType } from "./components/TextArea";

const LabeledInput: {
	Container: React.FC<TContainerPropsType>;
	Input: React.FC<TInputPropsType>;
	TextArea: React.FC<TTextAreaPropsType>;
} = {
	Container,
	Input,
	TextArea,
};

export default LabeledInput;
