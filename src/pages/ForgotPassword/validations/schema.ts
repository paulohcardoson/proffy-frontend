import Joi from "joi";

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
}).required();

export default schema;
