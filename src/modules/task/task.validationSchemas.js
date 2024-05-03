import joi from "joi";
import { objectIdValidation } from "../../middlewares/validation.middleware.js";

//===================addTaskSchema===================//
export const addTaskSchema = joi
  .object({
    //data from body
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().valid("toDo", "doing", "done"),
    userID: joi.custom(objectIdValidation).required(),
    assignTo: joi.custom(objectIdValidation).required(),
    deadline: joi.date().required(),
  })
  .required();

//===================updateTaskSchema===================//
export const updateTaskSchema = joi.object({
    //data from body
    title: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().valid("toDo", "doing", "done"),
    assignTo: joi.custom(objectIdValidation).required(),

    //data from query
    userID: joi.custom(objectIdValidation).required(),
    taskID: joi.custom(objectIdValidation).required(),
}).required()

//===================deleteTaskSchema===================//
export const deleteTaskSchema = joi.object({
    //data from query
    userID: joi.custom(objectIdValidation).required(),
    taskID: joi.custom(objectIdValidation).required(),
}).required()