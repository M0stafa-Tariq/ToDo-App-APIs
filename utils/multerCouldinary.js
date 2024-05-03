import multer, { diskStorage } from "multer";

export function uploadFileCould() {
  const storage = diskStorage({}); //save file in system "temp"

  const multerUpload = multer({ storage });

  return multerUpload;
}
