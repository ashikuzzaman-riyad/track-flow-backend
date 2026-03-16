import { Request, Response } from "express";
import * as OrderService from "./order.service";
import sendResponse from "../utils/sendResponse";
import catchAsync from "../utils/catchAsync";


export const getOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrders();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
});

export const getOrderById = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;

    const result = await OrderService.getOrderById(orderId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  }
);