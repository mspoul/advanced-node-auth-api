const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});


const forgotPassword=Joi.object({
    email: Joi.string().email().required()
});

const resetPassword=Joi.object({
    password:Joi.string().min(6).required()
});

const updatePassword=Joi.object({
    currPassword:Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
});

module.exports = { signupSchema,loginSchema,forgotPassword,resetPassword,updatePassword};
