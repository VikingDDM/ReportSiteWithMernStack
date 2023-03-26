import { NextFunction, Request, Response } from "express";
import {
    CreatePayInfoInput,
    UpdatePayInfoInput,
    DeletePayInfoInput,
} from "../schemas/paymentInfoSchema";
  import {
    createPayInfo,
    findAllPayInfo,
    findAndUpdatePayInfo,
    findOneAndDeletePayInfo,
} from "../services/payInfoService";
import AppError from "../utils/appError";

export const createPayInfoHandler = async (
  req: Request<CreatePayInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payinfo = await createPayInfo({ input: req.body});
    res.status(201).json({
      status: "success",
      data: {
        payinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updatePayInfoHandler = async (
  req: Request<UpdatePayInfoInput["params"], {}, UpdatePayInfoInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payinfo = await findAndUpdatePayInfo(
      { _id: req.params.payinfoId },
      req.body,
      {}
    );

    if (!payinfo) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
         payinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deletePayInfoHandler = async (
  req: Request<DeletePayInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payinfo = await findOneAndDeletePayInfo({ _id: req.params.payinfoId });

    if (!payinfo) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPayInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payinfo = await findAllPayInfo();

    res.status(200).json({
      status: "success",
      data: {
        payinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
  