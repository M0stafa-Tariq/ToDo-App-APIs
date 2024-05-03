import { Router } from "express";
import * as taskController from "./task.controller.js";
import asyncHandler from "express-async-handler";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import {
  addTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
} from "./task.validationSchemas.js";
const router = Router();

router.post(
  "/",
  isAuthenticated,
  validation(addTaskSchema),
  asyncHandler(taskController.addTask)
);
router.put(
  "/",
  isAuthenticated,
  validation(updateTaskSchema),
  asyncHandler(taskController.updateTask)
);
router.delete(
  "/",
  isAuthenticated,
  validation(deleteTaskSchema),
  asyncHandler(taskController.deleteTask)
);
router.get("/", asyncHandler(taskController.getAllTasksWithUserData));
router.get(
  "/getOne",
  isAuthenticated,
  asyncHandler(taskController.getTasksOfOneUseWithUserData)
);
router.get(
  "/notDone",
  asyncHandler(taskController.getAllTAsksThatNotDoneAfterDeadline)
);

export default router;
