import { Router } from "express";
import * as userController from "./user.controller.js";
import asyncHandler from "express-async-handler";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import {
  changePasswordSchema,
  loginSchema,
  signupSchema,
  updateUserSchema,
} from "./user.validationSchemas.js";
import { fileValidation, uploadFile } from "../../../utils/multer.js";
import { uploadFileCould } from "../../../utils/multerCouldinary.js";
const router = Router();

router.post("/", validation(signupSchema), asyncHandler(userController.signup));
router.post(
  "/login",
  validation(loginSchema),
  asyncHandler(userController.signin)
);
router.patch(
  "/",
  isAuthenticated,
  validation(changePasswordSchema),
  asyncHandler(userController.changePassword)
);
router.put(
  "/",
  isAuthenticated,
  validation(updateUserSchema),
  asyncHandler(userController.updateUser)
);
router.delete("/", isAuthenticated, asyncHandler(userController.deleteUser));
router.patch(
  "/softdelete",
  isAuthenticated,
  asyncHandler(userController.softDelete)
);

//========================profil pic router(file system)========================//

router.post(
  "/profile_pic",
  isAuthenticated,
  uploadFile({
    folder: "users/profilepics",
    filter: fileValidation.images,
  }).single("image"),
  asyncHandler(userController.profilPic)
);

//========================profil pic router(cloudinary)========================//

router.post(
  "/profile_pic_cloud",
  isAuthenticated,
  uploadFileCould().single("image"),
  asyncHandler(userController.profilPicCloud)
);
export default router;

//========================delete folder(cloudinary)========================//
router.delete('/deleteFolder',userController.delelteFolder)