import multer from "multer";
import { nanoid } from "nanoid";

export const fileValidation = {
  images: ["image/jpeg", "image/png", "image/webp"],
};

export function uploadFile({ folder, filter }) {
  console.log(`uploads/${folder}`);
  const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,`uploads/${folder}`)
    },
    filename: (req, file, cb) => {
      cb(null, nanoid() + "__" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!filter.includes(file.mimetype)) {
      return cb(new Error("invalid format!"), false);
      //false >>> dont save file
    }
    return cb(null, true);
    //null >> no errors
    //true >> save file
  };

  const multerUpload = multer({ fileFilter , storage });

  return multerUpload;
}
