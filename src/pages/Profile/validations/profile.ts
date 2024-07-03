import Joi from "joi";

const schema = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	bio: Joi.string().min(3).max(256).required(),
	phone_number: Joi.string().required(),
}).required();

export default schema;
