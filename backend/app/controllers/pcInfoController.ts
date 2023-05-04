import { NextFunction, Request, Response } from "express";
import {
    CreatePcInfoInput,
    UpdatePcInfoInput,
    DeletePcInfoInput,
} from "../schemas/pcInfoSchema";
  import {
    createPcInfo,
    findAllPcInfo,
    findAndUpdatePcInfo,
    findOneAndDeletePcInfo,
} from "../services/pcInfoService";
import AppError from "../utils/appError";

export const createPcInfoHandler = async (
  req: Request<CreatePcInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const pcInfo = await createPcInfo({ input: req.body});
    
    res.status(201).json({
      status: "success",
      data: {
        pcInfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updatePcInfoHandler = async (
  req: Request<UpdatePcInfoInput["params"], {}, UpdatePcInfoInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const pcInfo = await findAndUpdatePcInfo(
      { _id: req.params.pcinfoId },
      req.body,
      {}
    );

    if (!pcInfo) {
      return next(new AppError("PcInfo with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        pcInfo,
      },
    });
  } catch (err: any) {
    console.log(err); 
    next(err);
  }
};

export const deletePcInfoHandler = async (
  req: Request<DeletePcInfoInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const pcInfo = await findOneAndDeletePcInfo({ _id: req.params.pcinfoId });

    if (!pcInfo) {
      return next(new AppError("PcInfo with that ID not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    console.log(err); 
    next(err);
  }
};

export const getPcInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pcInfo = await findAllPcInfo();

    res.status(200).json({
      status: "success",
      data: {
        pcInfo,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
  

// const pcInfo = await findAllPcInfo();

// //setting timezone
// const resetPcInfo = pcInfo.map((eachVal:any) => {
//    const timezoneDate = new Date();
//    const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * 15;
//    timezoneDate.setTime(timezoneSecond);
//    return {
//     _id : eachVal._id,
//     username : eachVal.username,
//     deviceName : eachVal.deviceName,
//     hardware : eachVal.hardware,
//     created_at : timezoneDate.toLocaleString()
//    }
// })