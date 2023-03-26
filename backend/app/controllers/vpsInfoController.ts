import { NextFunction, Request, Response } from "express";
import {
    CreateVpsInfoInput,
    UpdateVpsInfoInput,
    DeleteVpsInfoInput,
} from "../schemas/vpsInfoschema";
  import {
    createVpsInfo,
    findAllVpsInfo,
    findAndUpdateVpsInfo,
    findOneAndDeleteVpsInfo,
} from "../services/vpsInfoService";
import AppError from "../utils/appError";

export const createVpsInfoHandler = async (
  req: Request<CreateVpsInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const vpsinfo = await createVpsInfo({ input: req.body});
    res.status(201).json({
      status: "success",
      data: {
        vpsinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateVpsInfoHandler = async (
  req: Request<UpdateVpsInfoInput["params"], {}, UpdateVpsInfoInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const vpsinfo = await findAndUpdateVpsInfo(
      { _id: req.params.vpsinfoId },
      req.body,
      {}
    );

    if (!vpsinfo) {
      return next(new AppError("VpsInfo with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        vpsinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteVpsInfoHandler = async (
  req: Request<DeleteVpsInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const vpsinfo = await findOneAndDeleteVpsInfo({ _id: req.params.vpsinfoId });

    if (!vpsinfo) {
      return next(new AppError("VpsInfo with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getVpsInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vpsinfo = await findAllVpsInfo();

    res.status(200).json({
      status: "success",
      data: {
        vpsinfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
  