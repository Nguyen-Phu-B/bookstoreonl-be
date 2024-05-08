import express from "express";
import UserController from "../controllers/user.controller.js";
import { authMDW } from "../middlewares/auth.mdw.js";
import uploadFile from "../config/multer.config.js";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send({ message: "Auth Connect" });
});

userRouter.put("/upload-avatar", authMDW, uploadFile.single("avatarUser"), UserController.updateAvatar);
userRouter.put("/update", authMDW, UserController.updateUserInfo);
userRouter.put("/change-password", authMDW, UserController.updatePassword);

export default userRouter;
