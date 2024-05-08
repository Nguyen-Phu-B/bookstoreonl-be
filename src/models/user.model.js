import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: Number,
            enum: [1, 2, 3],
        },
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dcgytjpvn/image/upload/v1700399941/Default/default-avatar_cqksnp.jpg",
        },
        birthday: {
            type: String,
        },
        address: {
            type: String,
        },
        pointMember: {
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
