require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from 'config';
import connectDB from './app/utils/connectDB';
import cookieParser from 'cookie-parser';
import authRouter from './app/routes/authRoute';
import userRouter from './app/routes/userRoute';
import reportRouter from "./app/routes/reportRoute";
import payInfoRouter from "./app/routes/payInfoRoute"
import pcInfoRouter from "./app/routes/pcInfoRoute";
import freelancerInfoRouter from "./app/routes/freelancerInfoRoute";
import upworkInfoRouter from "./app/routes/upworkInfoRoute";
import vpsInfoRouter from "./app/routes/vpsInfoRoute";
import paymentRouter from "./app/routes/paymentRoute"
import path from "path";

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use("/api/auth", authRouter);
app.use('/api/users', userRouter);
app.use("/api/reports", reportRouter);
app.use("/api/payinfo", payInfoRouter);
app.use("/api/pcinfo", pcInfoRouter);
app.use("/api/freelancerInfo", freelancerInfoRouter);
app.use("/api/upworkInfo", upworkInfoRouter);
app.use("/api/vpsInfo", vpsInfoRouter);
app.use("/api/payment", paymentRouter);
// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// set a port and litsen request
const PORT = config.get<number>("port");
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    connectDB();
});