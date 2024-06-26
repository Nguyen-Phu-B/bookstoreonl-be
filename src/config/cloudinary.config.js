import { v2 as cloudinary } from "cloudinary";

export const configCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY_CLOUD,
        api_secret: process.env.API_SECRET_CLOUD,
    });
};
