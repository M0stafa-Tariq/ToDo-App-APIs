import { v2 as cloudinary } from "cloudinary";

const cloudinaryConn =  ()=>{
  cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  return cloudinary
}

export default cloudinaryConn;
