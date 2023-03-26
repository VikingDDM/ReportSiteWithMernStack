import { NextFunction, Request, Response } from "express";
import {
    CreateUpworkInfoInput,
    UpdateUpworkInfoInput,
    DeleteUpworkInfoInput,
} from "../schemas/upworkInfoSchema";
  import {
    createUpworkInfo,
    findAllUpworkInfo,
    findAndUpdateUpworkInfo,
    findOneAndDeleteUpworkInfo,
} from "../services/upworkInfoService";
import AppError from "../utils/appError";

export const createUpworkInfoHandler = async (
  req: Request<CreateUpworkInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const upworkinfo = await createUpworkInfo({ input: req.body});
    res.status(201).json({
      status: "success",
      data: {
        upworkinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUpworkInfoHandler = async (
  req: Request<UpdateUpworkInfoInput["params"], {}, UpdateUpworkInfoInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const upworkinfo = await findAndUpdateUpworkInfo(
      { _id: req.params.upworkinfoId },
      req.body,
      {}
    );

    if (!upworkinfo) {
      return next(new AppError("UpworkInfo with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        upworkinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteUpworkInfoHandler = async (
  req: Request<DeleteUpworkInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const upworkinfo = await findOneAndDeleteUpworkInfo({ _id: req.params.upworkinfoId });

    if (!upworkinfo) {
      return next(new AppError("UpworkInfo with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUpworkInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const upworkinfo = await findAllUpworkInfo();

    res.status(200).json({
      status: "success",
      data: {
        upworkinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
  