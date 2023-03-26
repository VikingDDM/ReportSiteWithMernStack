import { NextFunction, Request, Response } from "express";
import {
  CreatePayPlanInput,
  CreatePayHistoryInput,
  UpdatePayHistoryInput,
  DeletePaymentInput,
  UpdatePayPlanInput,
} from "../schemas/paymentSchema";
import {
  createPayment,
  findAndUpdatePayment,
  findOneAndDelete,
  findPayment,
} from "../services/paymentService";
import { findAllUsers } from "../services/userService";
import AppError from "../utils/appError";

export const createPayPlanHandler = async (
    req: Request<CreatePayPlanInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payment = await createPayment({ input: req.body });
      
      res.status(201).json({
        status: "success",
        data: {
          payment,
        },
      });
    } catch (err: any) {
      next(err);
    }
};

export const createPayHistoryHandler = async (
    req: Request<CreatePayHistoryInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payment = await createPayment({ input: req.body });

      console.log(payment.name)
      const monthlyPayment = 
      res.status(201).json({
        status: "success",
        data: {
          payment,
        },
      });
    } catch (err: any) {
      next(err);
    }
};
  
export const getMonthlyPaymentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const firstDay = new Date();
    const lastDay = new Date();

    const thisMonth = today.getMonth();
    
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const nextMonth = thisMonth === 11 ? 0 : thisMonth + 1;
    

    if(today.getDate() <= 24) {
        firstDay.setMonth(lastMonth);          
        lastDay.setMonth(thisMonth);
      } else {
        firstDay.setMonth(thisMonth); 
        lastDay.setMonth(nextMonth);}
   
    firstDay.setDate(26); firstDay.setHours(-7); firstDay.setMinutes(0);
    lastDay.setDate(25); lastDay.setHours(16); lastDay.setMinutes(59);
    
    const query = {
      created_at: { $gte: firstDay, $lte: lastDay }
    }
    const payment = await findPayment(query);
    
    
    res.status(200).json({
      status: "success",
      data: {
        payment
      },
    });
    
  } catch (err: any) {
    next(err);
  }
};

export const updatePaymentPlanHandler = async (
  req: Request<UpdatePayPlanInput["params"], {}, UpdatePayPlanInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await findAndUpdatePayment(
      { _id: req.params.paymentId },
      req.body,
      {}
    );

    if (!payment) {
      return next(new AppError("Payment with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post: payment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updatePaymentHistoryHandler = async (
    req: Request<UpdatePayHistoryInput["params"], {}, UpdatePayHistoryInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payment = await findAndUpdatePayment(
        { _id: req.params.paymentId },
        req.body,
        {}
      );
  
      if (!payment) {
        return next(new AppError("Payment with that ID not found", 404));
      }
  
      res.status(200).json({
        status: "success",
        data: {
          post: payment,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };

export const deletePaymentHandler = async (
  req: Request<DeletePaymentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await findOneAndDelete({ _id: req.params.paymentId });

    if (!payment) {
      return next(new AppError("Payment with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

