import Joi from "joi";

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(8).max(256).required(),
}).required();

export default schema;
