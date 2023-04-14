import { NextFunction, Request, Response } from "express";
import {
  CreateReportInput,
  DeleteReportInput,
  UpdateReportInput,
  GetReportStatusInput
} from "../schemas/reportSchema";
import {
  createReport,
  findAndUpdateReport,
  findOneAndDelete,
  findReports,
} from "../services/reportService";
import { findUserById, findUsers} from "../services/userService";
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
    const queryServerTimeZone = {
      serverTimezone: { $ne: null}
    }
    const timezone = await findUsers(queryServerTimeZone);
    let timezoneAdding:number;
    if(parseInt(timezone[0].serverTimezone)<0){
      timezoneAdding = 8 - parseInt(timezone[0].serverTimezone);
    } else {
      timezoneAdding = 9 - parseInt(timezone[0].serverTimezone);
    }
    
    const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * timezoneAdding;
    const today = new Date();
    today.setTime(timezoneSecond);
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
    
    const timezoneDate = new Date();
    timezoneDate.setTime(timezoneSecond);
    const thisTime = timezoneDate.getHours();
    const thisDay = timezoneDate.getDay();

    const reports = await findReports(query);
    const users = await findUserById(res.locals.user._id);

    const resetReports = reports.map((eachVal:any) => {
      const timezoneDate = new Date();
      const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * timezoneAdding;
      timezoneDate.setTime(timezoneSecond);
      return {
       _id : eachVal._id,
       Username : eachVal.Username,
       Payment : eachVal.Payment,
       Project : eachVal.Project,
       Study : eachVal.Study,
       Extra : eachVal.Extra,
       created_at : timezoneDate.toLocaleString()
      }
   })
    const reportsWithUser = [resetReports, users, thisTime, thisDay];
    
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
    const queryServerTimeZone = {
      serverTimezone: { $ne: null}
    }
    const timezone = await findUsers(queryServerTimeZone);
    let timezoneAdding:number;
    if(parseInt(timezone[0].serverTimezone)<0){
      timezoneAdding = 8 - parseInt(timezone[0].serverTimezone);
    } else {
      timezoneAdding = 9 - parseInt(timezone[0].serverTimezone);
    }
    const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * timezoneAdding;
    const today = new Date();
    today.setTime(timezoneSecond);
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
    const userquery = {
      role: {$eq:'user'}
    }
    const timezoneDate = new Date();
    timezoneDate.setTime(timezoneSecond);
    const thisDay = timezoneDate.getDay();

    const reports = await findReports(query);
    const users = await findUsers(userquery);

    const resetReports = reports.map((eachVal:any) => {
      const timezoneDate = new Date();
      const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * timezoneAdding;
      timezoneDate.setTime(timezoneSecond);
      return {
       _id : eachVal._id,
       Username : eachVal.Username,
       Payment : eachVal.Payment,
       Project : eachVal.Project,
       Study : eachVal.Study,
       Extra : eachVal.Extra,
       created_at : timezoneDate.toLocaleString()
      }
   })
    const reportsWithUsers = [resetReports, users, thisDay, timezoneDate.toLocaleString()];
    
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

export const getReportStatusHandler = async (
  req: Request<GetReportStatusInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const queryServerTimeZone = {
      serverTimezone: { $ne: null}
    }
    const timezone = await findUsers(queryServerTimeZone);
    let timezoneAdding:number;
    if(parseInt(timezone[0].serverTimezone)<0){
      timezoneAdding = 8 - parseInt(timezone[0].serverTimezone);
    } else {
      timezoneAdding = 9 - parseInt(timezone[0].serverTimezone);
    }
    const timezoneSecond = Date.parse((new Date(req.params.reportId)).toUTCString());
    const today = new Date();
    today.setTime(timezoneSecond);
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
    const userquery = {
      role: {$eq:'user'}
    }
    const timezoneDate = new Date();
    timezoneDate.setTime(timezoneSecond);
    const thisDay = timezoneDate.getDay();

    const reports = await findReports(query);
    const users = await findUsers(userquery);

    const resetReports = reports.map((eachVal:any) => {
      const timezoneDate = new Date();
      const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * timezoneAdding;
      timezoneDate.setTime(timezoneSecond);
      return {
       _id : eachVal._id,
       Username : eachVal.Username,
       Payment : eachVal.Payment,
       Project : eachVal.Project,
       Study : eachVal.Study,
       Extra : eachVal.Extra,
       created_at : timezoneDate.toLocaleString()
      }
   })
    const reportStatusWithUsers = [resetReports, users, thisDay];
    
    res.status(200).json({
      status: "success",
      data: {
        reportStatusWithUsers
      },
    });
    
  } catch (err: any) {
    next(err);
  }
}

export const getUserWeeklyReportsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryServerTimeZone = {
      serverTimezone: { $ne: null}
    }
    const timezone = await findUsers(queryServerTimeZone);
    let timezoneAdding:number;
    if(parseInt(timezone[0].serverTimezone)<0){
      timezoneAdding = 8 - parseInt(timezone[0].serverTimezone);
    } else {
      timezoneAdding = 9 - parseInt(timezone[0].serverTimezone);
    }
    const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * timezoneAdding;
    const today = new Date();
    today.setTime(timezoneSecond);
    const weeklyDay = today.getDay();
    
    const weeklyLastDay = new Date();
    const weeklyFirstDay = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    let millisecondAfter;

    if(weeklyDay === 0){
      millisecondAfter = Date.parse(today.toLocaleString()) - 86400000 * (weeklyDay - 1);
    } else {
      millisecondAfter = Date.parse(today.toLocaleString()) - 86400000 * weeklyDay;
    }
    
    const millisecondBefore = millisecondAfter + 86400000 * 5;

    weeklyFirstDay.setTime(millisecondAfter + 86400000);
    weeklyLastDay.setTime(millisecondBefore);
    weeklyFirstDay.setHours(-7); weeklyFirstDay.setMinutes(0);
    weeklyLastDay.setHours(16); weeklyLastDay.setMinutes(59);
    const query = {
      user: { $eq: res.locals.user._id },
      created_at: { $gte: weeklyFirstDay, $lte: weeklyLastDay }
    }

    const timezoneDate = new Date();
    timezoneDate.setTime(timezoneSecond);
    const thisDay = timezoneDate.getDay();
    
    const reports = await findReports(query);
    const user = await findUserById(res.locals.user._id);

    const resetReports = reports.map((eachVal:any) => {
      const timezoneDate = new Date();
      const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * timezoneAdding;
      timezoneDate.setTime(timezoneSecond);
      return {
       _id : eachVal._id,
       Username : eachVal.Usernames,
       Payment : eachVal.Payment,
       Project : eachVal.Project,
       Study : eachVal.Study,
       Extra : eachVal.Extra,
       created_at : timezoneDate.toLocaleString()
      }
   })
    const reportsWithUser = [resetReports, user, thisDay];
    
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

// export const getMonthlyReportStatusHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const today = new Date();
//     const thisYear = today.getFullYear();
//     const thisMonth = today.getMonth() + 1;
//     const thisDate = today.getDate();
//     let numberOfDates = 31;

//     if(thisMonth === 4 || 6 || 9 || 11) {numberOfDates = 30};
//     if(thisMonth === 2) {if(thisYear % 4 === 0){numberOfDates = 28} else{numberOfDates = 29}}
    
//     const MonthlyLastDay = new Date();
//     const MonthlyFirstDay = new Date();

//     today.setHours(0);
//     today.setMinutes(0);
//     today.setSeconds(0);

//     const millisecondAfter = Date.parse(today.toLocaleString()) - (86400000 * (thisDate - 1));
//     const millisecondBefore = millisecondAfter + 86400000 * numberOfDates;

//     MonthlyFirstDay.setTime(millisecondAfter);
//     MonthlyLastDay.setTime(millisecondBefore);

//     const query = {
//       created_at: { $gte: MonthlyFirstDay, $lte: MonthlyLastDay }
//     }
    
//     const reports = await findReports(query);
//     const users = await findAllUsers();
//     const reportsWithUser = [reports, users];
    
//     res.status(200).json({
//       status: "success",
//       data: {
//         reportsWithUser
//       },
//     });
    
//   } catch (err: any) {
//     next(err);
//   }
// };

// export const getWeeklyReportStatusHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const today = new Date();
//     const weeklyDay = today.getDay();

//     const weeklyLastDay = new Date();
//     const weeklyFirstDay = new Date();

//     today.setHours(0);
//     today.setMinutes(0);
//     today.setSeconds(0);

//     let millisecondAfter;

//     if(weeklyDay === 0){
//       millisecondAfter = Date.parse(today.toLocaleString()) - 86400000 * (weeklyDay - 1);
//     } else {
//       millisecondAfter = Date.parse(today.toLocaleString()) - 86400000 * weeklyDay;
//     }
    
//     const millisecondBefore = millisecondAfter + 86400000 * 6;

//     weeklyFirstDay.setTime(millisecondAfter + 86400000);
//     weeklyLastDay.setTime(millisecondBefore);
//     weeklyFirstDay.setHours(-7); weeklyFirstDay.setMinutes(0);
//     weeklyLastDay.setHours(16); weeklyLastDay.setMinutes(59);

//     const query = {
//       created_at: { $gte: weeklyFirstDay, $lte: weeklyLastDay }
//     }
//     const userquery = {
//       role: {$eq:'user'}
//     }
    
//     const reports = await findReports(query);
//     const users = await findUsers(userquery);
//     const reportsWithUsers = [reports, users];
    
//     res.status(200).json({
//       status: "success",
//       data: {
//         reportsWithUsers
//       },
//     });
    
//   } catch (err: any) {
//     next(err);
//   }
// };