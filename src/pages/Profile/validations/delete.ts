import Joi from "joi";

const schema = Joi.object({
	password: Joi.string().min(8).max(256).required(),
}).required();

export default schema;
