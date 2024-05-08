import express from "express";
import authRouter from "./auth.route.js";
import booksRouter from "./books.route.js";
import orderRouter from "./order.route.js";
import userRouter from "./user.route.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);

export default router;
