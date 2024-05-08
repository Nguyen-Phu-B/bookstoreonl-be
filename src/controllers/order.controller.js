import asyncHandler from "express-async-handler";
import BadRequestError from "../errors/BadRequestError.js";
import OrderModel from "../models/order.model.js";

const OrderController = {
    postNewOrder: asyncHandler(async (req, res) => {
        const data = req.body;

        if (data.orderList.length < 1) {
            return BadRequestError.sendErrorResponse(res, "Không có sản phẩm");
        }

        const order = await OrderModel.create(data);
        res.status(200).json(order);
    }),

    getOrdersById: asyncHandler(async (req, res) => {
        const { userId } = req.user;

        const orders = await OrderModel.find({ userId });

        if (!orders) {
            return BadRequestError.sendErrorResponse(res, "Chưa có lịch sử giao dịch");
        }

        res.status(200).json(orders);
    }),

    getOrderById: asyncHandler(async (req, res) => {
        const { orderId } = req.params;

        const order = await OrderModel.findById(orderId);

        if (!order) {
            return BadRequestError.sendErrorResponse(res, "Đơn hàng không tồn tại");
        }

        res.status(200).json(order);
    }),
};

export default OrderController;
