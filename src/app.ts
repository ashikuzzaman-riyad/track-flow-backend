
import express, { Request, Response } from "express";
import { orderRoutes } from "./modules/order.routes.js"; 
import chalk from "chalk";


const app = express();

app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  
  console.log(
    chalk.hex('#FF9A00')("  📩 [GET] ") + 
    chalk.white("Root Access: ") + 
    chalk.dim(new Date().toLocaleTimeString())
  );

  res.status(200).json({
    success: true,
    message: "🚀 Order Tracking System API is Operational",
    version: "1.0.0",
    developer: "Infanity", 
    status: "Healthy",
    timestamp: new Date().toISOString()
  });
});


app.use("/api/orders", orderRoutes);


app.use("*", (req: Request, res: Response) => {
  console.log(chalk.hex('#FF0055')(`  🚫 [404] Missing Ingress: ${req.originalUrl}`));
  res.status(404).json({
    success: false,
    message: "Route not found in core system"
  });
});

export default app;