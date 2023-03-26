import { NextFunction, Request, Response } from "express";
import {
  CreateReportInput,
  DeleteReportInput,
  UpdateReportInput,
} from "../schemas/reportSchema";
import {
  createReport,
  findAndUpdateReport,
  findOneAndDelete,
  findReports,
} from "../services/reportService";
import { findUserById, findAllUsers } from "../services/userService";
import AppError from "../utils/appError";

export const createReportHandler = async (
    req: Request<CreateReportInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = res.locals.user._id;
      const report = await createReport({ input: req.body, user_id });
      res.status(201).json({
        status: "success",
        data: {
          report,
        },
      });
    } catch (err: any) {
      next(err);
    }
};
  
export const getUserDailyReportsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const tomorrow = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const millisecondAfter = Date.parse(today.toLocaleString());
    const millisecondBefore = millisecondAfter + 86400000;

    tomorrow.setTime(millisecondBefore);

    const query = {
      user: { $eq: res.locals.user._id },
      created_at: { $gte: today, $lte: tomorrow }
    }

    const reports = await findReports(query);
    const users = await findUserById(res.locals.user._id);
    const reportsWithUser = [reports, users];
    
    res.status(200).json({
      status: "success",
      data: {
        reportsWithUser
      },
    });
    
  } catch (err: any) {
    next(err);
  }
};

export const getDailyReportStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const tomorrow = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const millisecondAfter = Date.parse(today.toLocaleString());
    const millisecondBefore = millisecondAfter + 86400000;

    tomorrow.setTime(millisecondBefore);

    const query = {
      created_at: { $gte: today, $lte: tomorrow }
    }

    const reports = await findReports(query);
    const users = await findAllUsers();
      const reportsWithUsers = [reports, users];
    
    res.status(200).json({
      status: "success",
      data: {
        reportsWithUsers
      },
    });
    
  } catch (err: any) {
    next(err);
  }
};

export const getUserWeeklyReportsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const weeklyDay = today.getDay();
    
    const weeklyLastDay = new Date();
    const weeklyFirstDay = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const millisecondAfter = Date.parse(today.toLocaleString()) - (86400000 * (weeklyDay - 1));
    const millisecondBefore = millisecondAfter + 86400000 * 5;

    weeklyFirstDay.setTime(millisecondAfter);
    weeklyLastDay.setTime(millisecondBefore);

    const query = {
      user: { $eq: res.locals.user._id },
      created_at: { $gte: weeklyFirstDay, $lte: weeklyLastDay }
    }
    
    const reports = await findReports(query);
    const user = await findUserById(res.locals.user._id);
    const reportsWithUser = [reports, user];
    
    res.status(200).json({
      status: "success",
      data: {
        reportsWithUser
      },
    });
    
  } catch (err: any) {
    next(err);
  }
};

export const getMonthlyReportStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth() + 1;
    const thisDate = today.getDate();
    let numberOfDates = 31;

    if(thisMonth === 4 || 6 || 9 || 11) {numberOfDates = 30};
    if(thisMonth === 2) {if(thisYear % 4 === 0){numberOfDates = 28} else{numberOfDates = 29}}
    
    const MonthlyLastDay = new Date();
    const MonthlyFirstDay = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const millisecondAfter = Date.parse(today.toLocaleString()) - (86400000 * (thisDate - 1));
    const millisecondBefore = millisecondAfter + 86400000 * numberOfDates;

    MonthlyFirstDay.setTime(millisecondAfter);
    MonthlyLastDay.setTime(millisecondBefore);

    const query = {
      created_at: { $gte: MonthlyFirstDay, $lte: MonthlyLastDay }
    }
    
    const reports = await findReports(query);
    const users = await findAllUsers();
    const reportsWithUser = [reports, users];
    
    res.status(200).json({
      status: "success",
      data: {
        reportsWithUser
      },
    });
    
  } catch (err: any) {
    next(err);
  }
};

export const getWeeklyReportStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const weeklyDay = today.getDay();
    
    const weeklyLastDay = new Date();
    const weeklyFirstDay = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const millisecondAfter = Date.parse(today.toLocaleString()) - (86400000 * (weeklyDay - 1));
    const millisecondBefore = millisecondAfter + 86400000 * 5;

    weeklyFirstDay.setTime(millisecondAfter);
    weeklyLastDay.setTime(millisecondBefore);

    const query = {
      created_at: { $gte: weeklyFirstDay, $lte: weeklyLastDay }
    }
    
    const reports = await findReports(query);
    const users = await findAllUsers();
    const reportsWithUsers = [reports, users];
    
    res.status(200).json({
      status: "success",
      data: {
        reportsWithUsers
      },
    });
    
  } catch (err: any) {
    next(err);
  }
};

export const updateReportHandler = async (
  req: Request<UpdateReportInput["params"], {}, UpdateReportInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedPost = await findAndUpdateReport(
      { _id: req.params.reportId },
      req.body,
      {}
    );

    if (!updatedPost) {
      return next(new AppError("Post with that ID not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post: updatedPost,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteReportHandler = async (
  req: Request<DeleteReportInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const report = await findOneAndDelete({ _id: req.params.reportId });

    if (!report) {
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

