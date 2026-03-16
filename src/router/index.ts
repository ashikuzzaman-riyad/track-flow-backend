import { Router } from "express";
import { orderRoutes } from "../modules/order.routes";

const router = Router();

router.use("/orders", orderRoutes);

export default router;