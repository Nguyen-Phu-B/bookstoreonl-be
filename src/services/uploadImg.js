import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

export const uploadImg = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
            folder: "book-store",
        });

        const imgUrl = result && result.secure_url;
        fs.unlinkSync(file.path);

        return imgUrl;
    } catch (error) {
        console.error("🚀 ~ uploadImg ~ error:", error);
        fs.unlinkSync(file.path);
    }
};
