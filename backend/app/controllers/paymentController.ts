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
  createMonthlyTotal,
  createEachMonthlyTotal,
  findAndUpdatePayment,
  findOneAndDelete,
  findPayment,
  findPaymentById,
} from "../services/paymentService";
import { findAllUsers, findUserById } from "../services/userService";
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

export const getPayPlanHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const firstDay = new Date();
    const lastDay = new Date();
    const user_id = res.locals.user._id;
    const user = await findUserById(user_id)

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
      created_at: { $gte: firstDay, $lte: lastDay },
      plan: { $ne: null},
      name: {$eq: user.name}
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

export const deletePayPlanHandler = async (
  req: Request<DeletePaymentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment:any = await findOneAndDelete({ _id: req.params.paymentId });

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

export const createPayHistoryHandler = async (
    req: Request<CreatePayHistoryInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payment = await createPayment({ input: req.body });

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

      // create monthlyTotal
      const queryMonthlyTotal = {
        created_at: { $gte: firstDay, $lte: lastDay },
        amount: { $ne: null}
      }
      const monthlyPayment = await findPayment(queryMonthlyTotal);
      let monthlyPay = 0;
      monthlyPayment.map((eachPayment) => (
        monthlyPay += parseInt(eachPayment.amount) 
      ));
      const monthlyTotal = monthlyPay.toString();
      await createMonthlyTotal({ monthlyTotal });

      // create eachMonthlyTotal
      const queryEachMonthlyTotal = {
        created_at: { $gte: firstDay, $lte: lastDay },
        name: {$eq: payment.name},
        amount: { $ne: null}
      }
      const eachMonthlyPayment = await findPayment(queryEachMonthlyTotal);
      let eachMonthlyPay = 0;
      eachMonthlyPayment.map((eachPayment) => (
        eachMonthlyPay += parseInt(eachPayment.amount) 
      ));
      const eachMonthlyTotal = eachMonthlyPay.toString();
      const eachName = payment.name
      await createEachMonthlyTotal({ eachMonthlyTotal, eachName });
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
      created_at: { $gte: firstDay, $lte: lastDay },
      amount: { $ne: null}
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


export const updatePaymentHistoryHandler = async (
    req: Request<UpdatePayHistoryInput["params"], {}, UpdatePayHistoryInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payment:any = await findAndUpdatePayment(
        { _id: req.params.paymentId },
        req.body,
        {}
      );
      
      if (!payment) {
        return next(new AppError("Payment with that ID not found", 404));
      } else {
        const today = payment.created_at;
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
  
        // create monthlyTotal
        const queryMonthlyTotal = {
          created_at: { $gte: firstDay, $lte: lastDay },
          amount: { $ne: null}
        }
        const monthlyPayment = await findPayment(queryMonthlyTotal);
        let monthlyPay = 0;
        monthlyPayment.map((eachPayment) => (
          monthlyPay += parseInt(eachPayment.amount) 
        ));
        const monthlyTotal = monthlyPay.toString();
        await createMonthlyTotal({ monthlyTotal });
  
        // create eachMonthlyTotal
        const queryEachMonthlyTotal = {
          created_at: { $gte: firstDay, $lte: lastDay },
          name: {$eq: payment.name},
          amount: { $ne: null}
        }
        const eachMonthlyPayment = await findPayment(queryEachMonthlyTotal);
        let eachMonthlyPay = 0;
        eachMonthlyPayment.map((eachPayment) => (
          eachMonthlyPay += parseInt(eachPayment.amount) 
        ));
        const eachMonthlyTotal = eachMonthlyPay.toString();
        const eachName = payment.name
        await createEachMonthlyTotal({ eachMonthlyTotal, eachName });
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
    const payment:any = await findOneAndDelete({ _id: req.params.paymentId });

    if (!payment) {
      return next(new AppError("Payment with that ID not found", 404));
    } else {
      const today = payment.created_at;
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
    
          // create monthlyTotal
          const queryMonthlyTotal = {
            created_at: { $gte: firstDay, $lte: lastDay },
            amount: { $ne: null}
          }
          const monthlyPayment = await findPayment(queryMonthlyTotal);
          let monthlyPay = 0;
          monthlyPayment.map((eachPayment) => (
            monthlyPay += parseInt(eachPayment.amount) 
          ));
          const monthlyTotal = monthlyPay.toString();
          await createMonthlyTotal({ monthlyTotal });
    
          // create eachMonthlyTotal
          const queryEachMonthlyTotal = {
            created_at: { $gte: firstDay, $lte: lastDay },
            name: {$eq: payment.name},
            amount: { $ne: null}
          }
          const eachMonthlyPayment = await findPayment(queryEachMonthlyTotal);
          let eachMonthlyPay = 0;
          eachMonthlyPayment.map((eachPayment) => (
            eachMonthlyPay += parseInt(eachPayment.amount) 
          ));
          const eachMonthlyTotal = eachMonthlyPay.toString();
          const eachName = payment.name
          await createEachMonthlyTotal({ eachMonthlyTotal, eachName });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllMonthlyPaymentHandler = async (
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
    
    const queryMonthlyAmount = {
      created_at: { $gte: firstDay, $lte: lastDay },
      monthlyAmount: { $ne: null}
    }
    const queryMonthlyEachAmount = {
      created_at: { $gte: firstDay, $lte: lastDay },
      eachMonthlyAmount: { $ne: null}
    }
    const queryMonthlyPayPlan = {
      created_at: { $gte: firstDay, $lte: lastDay },
      plan: { $ne: null},
    }
    const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
    const eachMonthlyAmounts:any = await findPayment(queryMonthlyEachAmount);
    const monthlyPayPlan = await findPayment(queryMonthlyPayPlan);
    let realEachMonthlyAmounts : any = [];
    let realMonthlyAmounts:any

    monthlyAmounts.sort( (p1:any, p2:any) => {
      if (p1.created_at < p2.created_at) return 1;
      if (p1.created_at > p2.created_at) return -1;
      return 0;
    });

    realMonthlyAmounts = monthlyAmounts[0]
    monthlyPayPlan.map((eachPlan) => {
      const individualAmounts =  eachMonthlyAmounts.filter((value:any) => {
        return value.name === eachPlan.name;
      })
      individualAmounts.sort( (p1:any, p2:any) => {
        if (p1.created_at < p2.created_at) return 1;
        if (p1.created_at > p2.created_at) return -1;
        return 0;
      });
      if(individualAmounts[0] === undefined){realEachMonthlyAmounts.push({name: eachPlan.name, eachMonthlyAmount: "0"})}
       else {realEachMonthlyAmounts.push(individualAmounts[0]);}
    })
    const payment = [realMonthlyAmounts, realEachMonthlyAmounts, monthlyPayPlan]
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
