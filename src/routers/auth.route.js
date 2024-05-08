import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authMDW } from "../middlewares/auth.mdw.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    res.send({ message: "Auth Connect" });
});

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/me", authMDW, AuthController.me);
// authRouter.post("/upload-avatar", uploadFile.single("userAvatar"), AuthController.uploadAvatar);

export default authRouter;
