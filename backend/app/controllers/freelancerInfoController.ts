import { NextFunction, Request, Response } from "express";
import {
    CreateFreelancerInfonput,
    UpdateFreelancerInfoInput,
    DeleteFreelancerInfoInput,
} from "../schemas/freelancerInfoSchema";
  import {
    createFreelancerInfo,
    findAllFreelancerInfo,
    findAndUpdateFreelancerInfo,
    findOneAndDeleteFreelancerInfo,
} from "../services/freelancerInfoService";
import AppError from "../utils/appError";

export const createFreelancerInfoHandler = async (
  req: Request<CreateFreelancerInfonput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const freelancerInfo = await createFreelancerInfo({ input: req.body});
    res.status(201).json({
      status: "success",
      data: {
        freelancerInfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateFreelancerInfoHandler = async (
  req: Request<UpdateFreelancerInfoInput["params"], {}, UpdateFreelancerInfoInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const freelancerInfo = await findAndUpdateFreelancerInfo(
      { _id: req.params.freelancerinfoId },
      req.body,
      {}
    );

    if (!freelancerInfo) {
      return next(new AppError("FreelancerInfo with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        freelancerInfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteFreelancerInfoHandler = async (
  req: Request<DeleteFreelancerInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const freelancerInfo = await findOneAndDeleteFreelancerInfo({ _id: req.params.freelancerinfoId });

    if (!freelancerInfo) {
      return next(new AppError("FreelancerInfo with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getFreelancerInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const freelancerInfo = await findAllFreelancerInfo();

    res.status(200).json({
      status: "success",
      data: {
        freelancerInfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
  