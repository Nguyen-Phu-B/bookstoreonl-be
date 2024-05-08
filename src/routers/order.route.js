import express from "express";
import OrderController from "../controllers/order.controller.js";
import { authMDW } from "../middlewares/auth.mdw.js";
const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
    res.send({ message: "Auth Connect" });
});

orderRouter.post("/postneworder", OrderController.postNewOrder);
orderRouter.get("/ordersById", authMDW, OrderController.getOrdersById);
orderRouter.get("/orderById/:orderId", authMDW, OrderController.getOrderById);

export default orderRouter;
