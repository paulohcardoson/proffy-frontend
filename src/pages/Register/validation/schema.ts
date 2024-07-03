import Joi from "joi";

const schema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(8).max(256).required(),
	name: Joi.string().min(3).max(100).required(),
	bio: Joi.string().min(3).max(256).required(),
	phone_number: Joi.string().required(),
}).required();

export default schema;
