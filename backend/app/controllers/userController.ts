import { NextFunction, Request, Response } from 'express';
import { UpdateRoleInput, DeleteUserInput, UpdatePasswordInput, UpdateServerTimeZoneInput} from '../schemas/userSchema'
import { findAllUsers, findAndUpdateUser, findOneAndDeleteUser, findUser } from '../services/userService';
import AppError from "../utils/appError";
import bcrypt from 'bcryptjs';

export const getServerTimeZoneHandler = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryServerTimeZone = {
      serverTimezone: { $ne: null}
    }
    const user = await findUser(queryServerTimeZone);
    
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateServerTimeZoneHandler = async (
  req: Request<UpdateServerTimeZoneInput["params"], {}, UpdateServerTimeZoneInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findAndUpdateUser(
      { _id: req.params.userinfoId },
      {
        serverTimezone: req.body.serverTimezone
      },
      {upsert: true, runValidators: false, new: true, lean: true }
    );
  
    if (!user) {
      return next(new AppError("Post with that ID not found", 404));
    } 

    res.status(200).json({
      status: "success",
      data: {
        user
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateRoleHandler = async (
  req: Request<UpdateRoleInput["params"], {}, UpdateRoleInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findAndUpdateUser(
      { _id: req.params.userinfoId },
      {
        role: req.body.role
      },
      {upsert: true, runValidators: false, new: true, lean: true }
    );
  
    if (!user) {
      return next(new AppError("Post with that ID not found", 404));
    } 

    res.status(200).json({
      status: "success",
      data: {
        user
      },
    });
  } catch (err: any) {
    next(err);
  }
};
export const updatePasswordHandler = async (
  req: Request<UpdatePasswordInput["params"], {}, UpdatePasswordInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    let user :any
    if(req.body.password !== undefined){
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      user = await findAndUpdateUser(
        { _id: req.params.userinfoId },
        {
          password: hashedPassword
        },
        {upsert: true, runValidators: false, new: true, lean: true }
      );
    }
  
    if (!user) {
      return next(new AppError("Post with that ID not found", 404));
    } 

    res.status(200).json({
      status: "success",
      data: {
        user
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const user = await findAllUsers();
    
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
}

export const deleteUserHandler = async (
  req: Request<DeleteUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findOneAndDeleteUser({ _id: req.params.userinfoId });

    if (!user) {
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

