import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getUserOrders);
orderRouter.get("/:orderId", getOrderById);

export default orderRouter;
