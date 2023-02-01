import Joi from "joi";

const createRoleSchema = Joi.object().keys({
  consumerUsername: Joi.string().min(3).max(30).required(),
  name: Joi.string().max(20).required(),
  token: Joi.string().required(),
});

const signSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  firstAdminPassword: Joi.string(),
});

const basicRequestSchema = Joi.object().keys({
  consumerUsername: Joi.string().min(3).max(30).required(),
  token: Joi.string().required(),
});

const updateUserSchema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  consumerUsername: Joi.string().min(3).max(30).required(),
  token: Joi.string().required(),
});

export { createRoleSchema, signSchema, basicRequestSchema, updateUserSchema };
