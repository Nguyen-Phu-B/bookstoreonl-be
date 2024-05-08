import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import BadRequestError from "../errors/BadRequestError.js";
import { uploadImg } from "../services/uploadImg.js";
import UserModel from "../models/user.model.js";

const UserController = {
    updateAvatar: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const file = req.file;

        if (!file) {
            return BadRequestError.sendErrorResponse(res, "Chưa chọn ảnh");
        }

        const avatarUrl = await uploadImg(file);

        const updateUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { avatar: avatarUrl },
            { new: true }
        ).select("-password");

        res.status(200).json(updateUser);
    }),

    updatePassword: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const { password, newPassword } = req.body;

        const user = await UserModel.findById(userId).select("password");

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            return BadRequestError.sendErrorResponse(res, "Mật khẩu không đúng");
        }

        const salt = await bcrypt.genSalt(10);
        const haledPassword = await bcrypt.hash(newPassword, salt);

        await UserModel.findByIdAndUpdate(userId, { password: haledPassword }, { new: true });

        res.status(200).json({
            message: "Thành công",
        });
    }),

    updateUserInfo: asyncHandler(async (req, res) => {
        const { userId } = req.user;
        const dataUpdate = req.body;

        const updateUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: dataUpdate },
            { new: true }
        ).select("-password");
        res.status(200).json(updateUser);
    }),
};

export default UserController;
