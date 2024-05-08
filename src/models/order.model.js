import mongoose from "mongoose";
import Book from "./books.model.js";
import User from "./user.model.js";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        userName: {
            type: String,
        },
        email: {
            type: String,
        },
        totalPrices: {
            type: Number,
            // required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        shipMethod: {
            type: Number,
            enum: [0, 1],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
        orderList: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "books",
                    required: true,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
    this.totalPrices = 0;
    for (const item of this.orderList) {
        try {
            const book = await Book.findById(item.productId);

            item.price = book.rePrice;
            this.totalPrices += book.rePrice * item.quantity;
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    }

    if (!this.orderDate) {
        this.orderDate = new Date();
    }

    if (!this.userName) {
        try {
            const user = await User.findById(this.userId);
            console.log("🚀 ~ user:", user);
            if (user) {
                this.userName = user.fullName;
            }
        } catch (error) {
            console.error("🚀 ~ error:", error);
        }
    }

    next();
});

const OrderModel = mongoose.model("Orders", OrderSchema);

export default OrderModel;
