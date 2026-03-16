import { Router } from "express";
import { getOrders, getOrderById } from "./order.controller";

const router = Router();

router.get("/", getOrders);
router.get("/:orderId", getOrderById);

export const  orderRoutes= router ;