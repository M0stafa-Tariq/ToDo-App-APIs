import jwt from "jsonwebtoken";
import User from "../../../DB/models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinaryConn from "../../../utils/cloudinary.js";

//========================signup========================//
export const signup = async (req, res, next) => {
  const { email } = req.body;
  //check email
  const isUser = await User.findOne({ email });
  if (isUser) return next(new Error("Email already exists!", { cause: 409 }));

  //hashed password
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    +process.env.SALT_ROUNDS
  );

  //create user
  const createUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  if (!createUser)
    return next(new Error("User registration failed", { cause: 400 }));

  return res.status(201).json({
    success: true,
    message: "User registration success",
  });
};

//========================signin========================//
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  //check email
  const isUser = await User.findOne({ email });
  if (!isUser)
    return next(new Error("Invalid user credentials1", { cause: 404 }));

  //check password
  const isPasswordMatch = bcrypt.compareSync(password, isUser.password);
  if (!isPasswordMatch)
    return next(new Error("Invalid user credentials", { cause: 400 }));

  //generate token
  const token = jwt.sign(
    { id: isUser._id, email: isUser.email },
    process.env.TOKEN_SECRET
  );

  return res.status(200).json({ success: true, token });
};

//========================cahnge password========================//
export const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const userID = req.payload.id;
  const user = await User.findById(userID);
  //check password
  const isPasswordMatch = bcrypt.compareSync(currentPassword, user.password);
  if (!isPasswordMatch)
    return next(new Error("Invalid current password", { cause: 400 }));

  //hashed new password
  const hashedNewPassword = bcrypt.hashSync(
    newPassword,
    +process.env.SALT_ROUNDS
  );

  const updatedPassword = await User.findByIdAndUpdate(
    { _id: userID },
    { password: hashedNewPassword }
  );
  if (!updatedPassword) {
    return next(new Error("updated faild", { cause: 400 }));
  }
  return res.status(200).json({ message: "Password updated successfully!" });
};

//========================update user========================//
export const updateUser = async (req, res, next) => {
  const userID = req.payload.id;

  //update user
  const updatedUser = await User.findByIdAndUpdate({ _id: userID }, req.body);
  if (!updatedUser) return next(new Error("Updated fail", { cause: 400 }));

  return res.status(200).json({ message: "User updated successfully!" });
};

//========================delete user========================//
export const deleteUser = async (req, res, next) => {
  const userID = req.payload.id;

  //delete user
  const deletedUser = await User.findByIdAndDelete(userID);
  if (!deletedUser) return next(new Error("delete fail", { cause: 400 }));

  return res.status(200).json({
    success: true,
    message: "deleted success!",
  });
};

//========================soft delete========================//
export const softDelete = async (req, res, next) => {
  const userID = req.payload.id;

  const softDeleteUser = await User.updateOne(
    { _id: userID },
    { isDeleted: true }
  );
  if (!softDeleteUser.modifiedCount)
    return next(new Error("Soft deleted fail", { cause: 400 }));

  return res.status(200).json({ message: "User soft delete successfully!" });
};

//========================profil pic (file system)========================//
export const profilPic = async (req, res, next) => {
  const id = req.payload.id;
  await User.findByIdAndUpdate(id, { profilePic: req.file.path });
  res.status(200).json({
    success: true,
    message: "Profile picture uploaded successfully!",
  });
};

//========================profil pic (cloudinary) with folder========================//
export const profilPicCloud = async (req, res, next) => {
  const id = req.payload.id;

  //upload file on cloudinary
  const { secure_url, public_id } = await cloudinaryConn().uploader.upload(
    req.file.path,
    {folder:`user/${id}/profil_pic`}
  );

  //save url in database
  await User.findByIdAndUpdate(id, {
    profilePicCloud: { secure_url, public_id },
  });

  res.status(200).json({
    success: true,
    message: "Profile picture uploaded successfully!",
  });
};

//========================delete folder from cloudinary========================//
export const delelteFolder = async(req,res,next)=>{
  const{folderName}= req.query
  await cloudinaryConn().api.delete_folder(folderName, (folderDeleteError, folderDeleteResult) => {
    if (folderDeleteError) {
      console.error(folderDeleteError);
    } else {
      console.log(folderDeleteResult);
}})
}