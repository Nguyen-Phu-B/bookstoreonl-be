import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import BadRequestError from "../errors/BadRequestError.js";
import UserModel from "../models/user.model.js";

const AuthController = {
    register: asyncHandler(async (req, res) => {
        const { email, phoneNumber, password, rePassword } = req.body;

        if (rePassword !== password) {
            return BadRequestError.sendErrorResponse(res, "Xác nhận mật khẩu chưa đúng");
        }

        const user = await UserModel.create({
            email,
            phoneNumber,
            password,
        });

        const jwtPayload = {
            userId: user._id,
        };

        const token = await jwt.sign(jwtPayload, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });

        res.status(200).json(token);
    }),

    login: asyncHandler(async (req, res) => {
        const { loginInfo, password } = req.body;

        const user = await UserModel.findOne({
            $or: [{ email: loginInfo }, { phoneNumber: loginInfo }],
        }).select("password");
        console.log("🚀 ~ login:asyncHandler ~ user:", user);
        if (!user) {
            // throw new BadRequestError("Tên đăng nhập không đúng");
            return BadRequestError.sendErrorResponse(res, "Tên đăng nhập không đúng");
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            // throw new BadRequestError("Mật khẩu đăng nhập không đúng");
            // res.status(400).json({ message: "loi" });
            return BadRequestError.sendErrorResponse(res, "Mật khẩu đăng nhập không đúng");
        }

        const jwtPayload = {
            userId: user._id,
        };

        const token = await jwt.sign(jwtPayload, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });

        res.status(200).json(token);
    }),

    me: asyncHandler(async (req, res) => {
        const { userId } = req.user;

        const currentUser = await UserModel.findById(userId).select("-password");

        if (!currentUser) {
            return BadRequestError.sendErrorResponse(res, "Không tìm thấy người dùng");
        }

        res.status(200).json({ userInfo: currentUser });
    }),
};

export default AuthController;
