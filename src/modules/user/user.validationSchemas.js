import joi from "joi";

//===================signupSchema===================//
export const signupSchema = joi
  .object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    age: joi.number().min(18).max(80),
    gender: joi.string().valid("male", "female"),
    phone: joi.string(),
  })
  .required();

//===================loginSchema===================//
export const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  })
  .required();

//===================loginSchema===================//
export const changePasswordSchema = joi
  .object({
    currentPassword: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    newPassword: joi
      .string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  })
  .required()
  .with("currentPassword", "newPassword");

//===================updateUserSchema===================//
export const updateUserSchema = joi.object({
  username: joi.string().required(),
  age: joi.number().min(18).max(80),
  phone: joi.string(),
}).required()
