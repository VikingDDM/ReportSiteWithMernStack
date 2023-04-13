import { NextFunction, Request, Response } from "express";
import {
  CreatePayPlanInput,
  CreatePayHistoryInput,
  UpdatePayHistoryInput,
  DeletePaymentInput,
  UpdatePayPlanInput,
  getAllPayHistoryInput
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
    const user_id = res.locals.user._id;
    const user = await findUserById(user_id)
    
    const query = {
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
      let realPayment = await createPayment({ input: req.body });

      let today = new Date();
      let firstDay = new Date();
      let lastDay = new Date();
  
      let thisMonth = today.getMonth();
      
      let lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
      let nextMonth = thisMonth === 11 ? 0 : thisMonth + 1;
      
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
        monthlyPay += parseFloat(eachPayment.amount) 
      ));
      const monthlyTotal = (monthlyPay.toFixed(4)).toString();
      await createMonthlyTotal({ monthlyTotal });

      // create eachMonthlyTotal
      const queryEachMonthlyTotal = {
        created_at: { $gte: firstDay, $lte: lastDay },
        name: {$eq: realPayment.name},
        amount: { $ne: null}
      }
      const eachMonthlyPayment = await findPayment(queryEachMonthlyTotal);
      let eachMonthlyPay = 0;
      eachMonthlyPayment.map((eachPayment) => (
        eachMonthlyPay += parseFloat(eachPayment.amount) 
      ));
      const eachMonthlyTotal = (eachMonthlyPay.toFixed(4)).toString();
      const eachName = realPayment.name
      await createEachMonthlyTotal({ eachMonthlyTotal, eachName });

      //response
      const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * 15;
      today = new Date();
      today.setTime(timezoneSecond);
      firstDay = new Date();
      lastDay = new Date();
  
      thisMonth = today.getMonth();
      let thisYear = today.getFullYear();
  
      let startYear = thisYear;
      let endYear = thisYear;
      lastMonth = thisMonth-1;
      nextMonth = thisMonth+1;
      if(thisMonth === 0){lastMonth = 11; startYear = thisYear-1;}
      if(thisMonth === 11){nextMonth = 0; endYear = thisYear+1;}
  
      if(today.getDate() <= 24) {
          firstDay.setMonth(lastMonth);          
          lastDay.setMonth(thisMonth);
          firstDay.setFullYear(startYear);          
          lastDay.setFullYear(thisYear);
        } else {
          firstDay.setMonth(thisMonth); 
          lastDay.setMonth(nextMonth);
          firstDay.setFullYear(thisYear);          
          lastDay.setFullYear(endYear);
        }
     
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
      const payPlanQueryDate = (lastDay.getFullYear()).toString()+(lastDay.getMonth() ).toString();
      const queryMonthlyPayPlan = {
        payPlanDate: { $eq: payPlanQueryDate },
        plan: { $ne: null},
      }
      const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
      const eachMonthlyAmounts:any = await findPayment(queryMonthlyEachAmount);
      const monthlyPayPlan = await findPayment(queryMonthlyPayPlan);
      let realEachMonthlyAmounts : any = [];
      let realMonthlyAmounts:any
  
      monthlyAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
  
      realMonthlyAmounts = monthlyAmounts[0];
      
      monthlyPayPlan.map((eachPlan:any) => {
        const individualAmounts =  eachMonthlyAmounts.filter((value:any) => {
          return value.name === eachPlan.name;
        })
        individualAmounts.sort( (p1:any, p2:any) => {
          if (p1.updated_at < p2.updated_at) return 1;
          if (p1.updated_at > p2.updated_at) return -1;
          return 0;
        });
        if(individualAmounts[0] === undefined){realEachMonthlyAmounts.push({name: eachPlan.name, eachMonthlyAmount: "0"})}
         else {realEachMonthlyAmounts.push(individualAmounts[0]);}
      })
      const allUsers = await findAllUsers();
      const payment = [realMonthlyAmounts, realEachMonthlyAmounts, monthlyPayPlan, allUsers];

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
    const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * 15;
    const today = new Date();
    today.setTime(timezoneSecond);
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
    const realMonthlyAmounts = await findPayment(query);

    const resetRealMonthlyAmounts = realMonthlyAmounts.map((eachVal:any) => {
      const timezoneDate = new Date();
      const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * 15;
      timezoneDate.setTime(timezoneSecond);
      return {
       _id : eachVal._id,
       name : eachVal.name,
       paymentWay : eachVal.paymentWay,
       amount : eachVal.amount,
       rate : eachVal.rate,
       realAmount : eachVal.realAmount,
       created_at : timezoneDate.toLocaleString()
      }
   })

    const allUsers = await findAllUsers();
    const payment = [resetRealMonthlyAmounts, allUsers]
  
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
      const updatedPayment:any = await findAndUpdatePayment(
        { _id: req.params.paymentId },
        req.body,
        {}
      );
      
      if (!updatedPayment) {
        return next(new AppError("Payment with that ID not found", 404));
      } else {
        const today = updatedPayment.created_at;
        const firstDay = new Date();
        const lastDay = new Date();
    
        const thisMonth = today.getMonth();
        const thisYear = today.getFullYear();

        const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;
        const nextYear = thisMonth === 11 ? thisYear + 1 : thisYear;
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
        const nextMonth = thisMonth === 11 ? 0 : thisMonth + 1;
        
        if(today.getDate() <= 24) {
            firstDay.setMonth(lastMonth); firstDay.setFullYear(lastYear);         
            lastDay.setMonth(thisMonth); lastDay.setFullYear(thisYear);         
          } else {
            firstDay.setMonth(thisMonth); firstDay.setFullYear(thisYear);  
            lastDay.setMonth(nextMonth); lastDay.setFullYear(nextYear);  }
       
        firstDay.setDate(26); firstDay.setHours(-7); firstDay.setMinutes(0);
        lastDay.setDate(25); lastDay.setHours(16); lastDay.setMinutes(59);

        const firstMoment = new Date();
        const secondMoment = new Date();
        const secMoment = today.getSeconds();
        const minMoment = today.getMinutes();
        const houMoment = today.getHours();
        const datemoment = today.getDate();
        const monmoment = today.getMonth();
        const yearmoment = today.getFullYear();
        firstMoment.setSeconds(secMoment - 1);
        firstMoment.setMinutes(minMoment);
        firstMoment.setHours(houMoment);
        firstMoment.setDate(datemoment);
        firstMoment.setMonth(monmoment);
        firstMoment.setFullYear(yearmoment);
        secondMoment.setSeconds(secMoment + 1);
        secondMoment.setMinutes(minMoment);
        secondMoment.setHours(houMoment);
        secondMoment.setDate(datemoment);
        secondMoment.setMonth(monmoment);
        secondMoment.setFullYear(yearmoment);
        // create monthlyTotal
        const queryMonthlyTotal = {
          created_at: { $gte: firstDay, $lte: lastDay },
          amount: { $ne: null}
        }
        const monthlyPayment = await findPayment(queryMonthlyTotal);
        
        let monthlyPay = 0;
        monthlyPayment.map((eachPayment) => (
          monthlyPay += parseFloat(eachPayment.amount) 
        ));
        const monthlyTotal = monthlyPay.toString();
        await findAndUpdatePayment(
          { created_at:  { $gte: firstMoment, $lte: secondMoment }, monthlyAmount: { $ne: null}},
          { monthlyAmount: monthlyTotal},
          {}
        );
  
        // create eachMonthlyTotal
        const queryEachMonthlyTotal = {
          created_at: { $gte: firstDay, $lte: lastDay },
          name: {$eq: req.body.name},
          amount: { $ne: null}
        }
        const eachMonthlyPayment = await findPayment(queryEachMonthlyTotal);
        let eachMonthlyPay = 0;
        eachMonthlyPayment.map((eachPayment) => (
          eachMonthlyPay += parseFloat(eachPayment.amount) 
        ));
        const eachMonthlyTotal = eachMonthlyPay.toString();
        await findAndUpdatePayment(
          { created_at:  { $gte: firstMoment, $lte: secondMoment }, eachMonthlyAmount: { $ne: null}},
          { eachMonthlyAmount: eachMonthlyTotal, name: req.body.name},
          {}
        );
      }
      //response
      const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * 15;
      let today = updatedPayment.created_at;
      today.setTime(timezoneSecond);
      let firstDay = new Date();
      let lastDay = new Date();
      let thisYear = today.getFullYear();
      let thisMonth = today.getMonth();
      if(today.getDate() > 25){thisMonth++}
      if(today > new Date("Decemnber 25, thisYear 00:00:00")){thisYear++;}
  
      let yearlyRealIndividualAmount = 0;
      let yearlyTotalAmount = 0;
      let yearlyEachMonthAmount = [];
      let yearlyEachTotalAmounts:any =[];
      let monthlyEachTotalAmounts:any = [];
      let recentPayments:any;
      
      for(let eachMonth = 0; eachMonth < 12; eachMonth++) {
        let startYear = thisYear;
        let firstMonth = eachMonth-1;
        if(eachMonth === 0){firstMonth = 11; startYear = thisYear-1;}
  
        firstDay.setFullYear(startYear);
        firstDay.setMonth(firstMonth);   
        firstDay.setDate(26); 
        firstDay.setHours(-7); 
        firstDay.setMinutes(0);
  
        lastDay.setFullYear(thisYear);
        lastDay.setMonth(eachMonth);
        lastDay.setDate(25); 
        lastDay.setHours(16); 
        lastDay.setMinutes(59);
  
        let queryRecentPayments:any;
        if(eachMonth === thisMonth) {
          queryRecentPayments = {
            created_at: { $gte: firstDay, $lte: lastDay },
            amount: { $ne: null}
          }
          recentPayments = await findPayment(queryRecentPayments);
        }
        
        const queryMonthlyAmount = {
        created_at: { $gte: firstDay, $lte: lastDay },
        monthlyAmount: { $ne: null}
        }
        const queryMonthlyEachAmount = {
          created_at: { $gte: firstDay, $lte: lastDay },
          eachMonthlyAmount: { $ne: null}
        }
        const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
        const eachMonthlyAmounts:any = await findPayment(queryMonthlyEachAmount);
        const allUsers = await findAllUsers();
        if(eachMonthlyAmounts.length === 0){yearlyEachMonthAmount.push(0); continue;}
        let realMonthlyAmounts:any
        monthlyAmounts.sort( (p1:any, p2:any) => {
          if (p1.updated_at < p2.updated_at) return 1;
          if (p1.updated_at > p2.updated_at) return -1;
          return 0;
        });
        realMonthlyAmounts = monthlyAmounts[0];
        yearlyTotalAmount += parseFloat(realMonthlyAmounts.monthlyAmount);
        yearlyEachMonthAmount.push(realMonthlyAmounts.monthlyAmount);
  
        let realEachMonthlyAmounts : any = [];
       
        allUsers.map((eachUser:any,key:any) => {
        let individualAmounts =  eachMonthlyAmounts.filter((value:any) => {
          return value.name === eachUser.name;
        })
  
        if(individualAmounts.length === 0){
          individualAmounts.push({name:eachUser.name,eachMonthlyAmount:"0",created_at:firstDay,updated_at:firstDay})
        }
        
        individualAmounts.sort( (p1:any, p2:any) => {
          if (p1.updated_at < p2.updated_at) return 1;
          if (p1.updated_at > p2.updated_at) return -1;
          return 0;
        });
        if(eachMonth === thisMonth){
          realEachMonthlyAmounts.push(individualAmounts[0]);
          monthlyEachTotalAmounts.push(realEachMonthlyAmounts);
        }
        if(yearlyEachTotalAmounts[key] === undefined){
          yearlyRealIndividualAmount = 0
        } else {
          yearlyRealIndividualAmount = yearlyEachTotalAmounts[key].yearlyIndividualAmount;
        }
        
        yearlyRealIndividualAmount += parseFloat(individualAmounts[0].eachMonthlyAmount);
        
        yearlyEachTotalAmounts[key] = {name:eachUser.name,yearlyIndividualAmount: yearlyRealIndividualAmount}
      })
      }
      const allUsers = await findAllUsers();

      today = new Date();
      firstDay = new Date();
      lastDay = new Date();
  
      thisMonth = today.getMonth();
      thisYear = today.getFullYear();
  
      let startYear = thisYear;
      let endYear = thisYear;
      let lastMonth = thisMonth-1;
      let nextMonth = thisMonth+1;
      if(thisMonth === 0){lastMonth = 11; startYear = thisYear-1;}
      if(thisMonth === 11){nextMonth = 0; endYear = thisYear+1;}
  
      if(today.getDate() <= 24) {
          firstDay.setMonth(lastMonth);          
          lastDay.setMonth(thisMonth);
          firstDay.setFullYear(startYear);          
          lastDay.setFullYear(thisYear);
        } else {
          firstDay.setMonth(thisMonth); 
          lastDay.setMonth(nextMonth);
          firstDay.setFullYear(thisYear);          
          lastDay.setFullYear(endYear);
        }
     
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
      const payPlanQueryDate = (lastDay.getFullYear()).toString()+(lastDay.getMonth()).toString();
      const queryMonthlyPayPlan = {
        payPlanDate: { $eq: payPlanQueryDate },
        plan: { $ne: null},
      }
      const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
      const eachMonthlyAmounts:any = await findPayment(queryMonthlyEachAmount);
      const monthlyPayPlan = await findPayment(queryMonthlyPayPlan);
      let realEachMonthlyAmounts : any = [];
      let realMonthlyAmounts:any
  
      monthlyAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
  
      realMonthlyAmounts = monthlyAmounts[0];
      
      monthlyPayPlan.map((eachPlan:any) => {
        const individualAmounts =  eachMonthlyAmounts.filter((value:any) => {
          return value.name === eachPlan.name;
        })
        individualAmounts.sort( (p1:any, p2:any) => {
          if (p1.updated_at < p2.updated_at) return 1;
          if (p1.updated_at > p2.updated_at) return -1;
          return 0;
        });
        if(individualAmounts[0] === undefined){realEachMonthlyAmounts.push({name: eachPlan.name, eachMonthlyAmount: "0"})}
         else {realEachMonthlyAmounts.push(individualAmounts[0]);}
      })
      
      const payment = [realMonthlyAmounts, realEachMonthlyAmounts, monthlyPayPlan, allUsers, updatedPayment.created_at]
  
      res.status(200).json({
        status: "success",
        data: {
          payment,
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
        const thisYear = today.getFullYear();

        const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;
        const nextYear = thisMonth === 11 ? thisYear + 1 : thisYear;
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
        const nextMonth = thisMonth === 11 ? 0 : thisMonth + 1;
        
        if(today.getDate() <= 24) {
            firstDay.setMonth(lastMonth); firstDay.setFullYear(lastYear);         
            lastDay.setMonth(thisMonth); lastDay.setFullYear(thisYear);         
          } else {
            firstDay.setMonth(thisMonth); firstDay.setFullYear(thisYear);  
            lastDay.setMonth(nextMonth); lastDay.setFullYear(nextYear);  }
      
          firstDay.setDate(26); firstDay.setHours(-7); firstDay.setMinutes(0);
          lastDay.setDate(25); lastDay.setHours(16); lastDay.setMinutes(59);
    
          const firstMoment = new Date();
          const secondMoment = new Date();
          const secMoment = today.getSeconds();
          const minMoment = today.getMinutes();
          const houMoment = today.getHours();
          const datemoment = today.getDate();
          const monmoment = today.getMonth();
          const yearmoment = today.getFullYear();
          firstMoment.setSeconds(secMoment - 1);
          firstMoment.setMinutes(minMoment);
          firstMoment.setHours(houMoment);
          firstMoment.setDate(datemoment);
          firstMoment.setMonth(monmoment);
          firstMoment.setFullYear(yearmoment);
          secondMoment.setSeconds(secMoment + 1);
          secondMoment.setMinutes(minMoment);
          secondMoment.setHours(houMoment);
          secondMoment.setDate(datemoment);
          secondMoment.setMonth(monmoment);
          secondMoment.setFullYear(yearmoment);
          // create monthlyTotal
          const queryMonthlyTotal = {
            created_at: { $gte: firstDay, $lte: lastDay },
            amount: { $ne: null}
          }
          const monthlyPayment = await findPayment(queryMonthlyTotal);
          let monthlyPay = 0;
          monthlyPayment.map((eachPayment) => (
            monthlyPay += parseFloat(eachPayment.amount) 
          ));
          const monthlyTotal = monthlyPay.toString();
          await findAndUpdatePayment(
            { created_at:  { $gte: firstMoment, $lte: secondMoment }, monthlyAmount: { $ne: null}},
            { monthlyAmount: monthlyTotal},
            {}
          );
    
          // create eachMonthlyTotal
          const queryEachMonthlyTotal = {
            created_at: { $gte: firstDay, $lte: lastDay },
            name: {$eq: payment.name},
            amount: { $ne: null}
          }
          const eachMonthlyPayment = await findPayment(queryEachMonthlyTotal);
          let eachMonthlyPay = 0;
          eachMonthlyPayment.map((eachPayment) => (
            eachMonthlyPay += parseFloat(eachPayment.amount) 
          ));
          const eachMonthlyTotal = eachMonthlyPay.toString();
          const a = await findAndUpdatePayment(
            { created_at:  { $gte: firstMoment, $lte: secondMoment }, eachMonthlyAmount: { $ne: null}},
            { eachMonthlyAmount: eachMonthlyTotal},
            {}
          );
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
    const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * 15;
    const today = new Date();
    today.setTime(timezoneSecond);
    const firstDay = new Date();
    const lastDay = new Date();
    
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();

    let startYear = thisYear;
    let endYear = thisYear;
    let lastMonth = thisMonth-1;
    let nextMonth = thisMonth+1;
    if(thisMonth === 0){lastMonth = 11; startYear = thisYear-1;}
    if(thisMonth === 11){nextMonth = 0; endYear = thisYear+1;}
    
    if(today.getDate() <= 24) {
        firstDay.setMonth(lastMonth);          
        lastDay.setMonth(thisMonth);
        firstDay.setFullYear(startYear);          
        lastDay.setFullYear(thisYear);
      } else {
        firstDay.setMonth(thisMonth); 
        lastDay.setMonth(nextMonth);
        firstDay.setFullYear(thisYear);          
        lastDay.setFullYear(endYear);
      }
   
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
    const payPlanQueryDate = (lastDay.getFullYear()).toString()+(lastDay.getMonth()).toString();
    
    const queryMonthlyPayPlan = {
      payPlanDate: { $eq: payPlanQueryDate },
      plan: { $ne: null},
    }
    const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
    const eachMonthlyAmounts:any = await findPayment(queryMonthlyEachAmount);
    const monthlyPayPlan = await findPayment(queryMonthlyPayPlan);
    let realEachMonthlyAmounts : any = [];
    let realMonthlyAmounts:any

    monthlyAmounts.sort( (p1:any, p2:any) => {
      if (p1.updated_at < p2.updated_at) return 1;
      if (p1.updated_at > p2.updated_at) return -1;
      return 0;
    });

    realMonthlyAmounts = monthlyAmounts[0];

    monthlyPayPlan.map((eachPlan:any) => {
      const individualAmounts =  eachMonthlyAmounts.filter((value:any) => {
        return value.name === eachPlan.name;
      })
      individualAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
      if(individualAmounts[0] === undefined){realEachMonthlyAmounts.push({name: eachPlan.name, eachMonthlyAmount: "0"})}
       else {realEachMonthlyAmounts.push(individualAmounts[0]);}
    })

    const timezoneDate = new Date();
    timezoneDate.setTime(timezoneSecond);

    const allUsers = await findAllUsers();
    const payment = [realMonthlyAmounts, realEachMonthlyAmounts, monthlyPayPlan, allUsers, timezoneDate.toLocaleDateString()]

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

export const getAllYearlyPaymentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timezoneSecond = Date.parse((new Date()).toUTCString()) + 3600000 * 15;
    const today = new Date();
    today.setTime(timezoneSecond);
    const firstDay = new Date();
    const lastDay = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    if(today.getDate() > 25){thisMonth++}
    if(today > new Date("Decemnber 25, thisYear 00:00:00")){thisYear++;}

    let yearlyTotalAmount = 0;
    let yearlyEachMonthAmount = [];
    let recentPayments:any;
    let resetRecentPayments:any;
    
    for(let eachMonth = 0; eachMonth < thisMonth + 1; eachMonth++) {
      let startYear = thisYear;
      let firstMonth = eachMonth-1;
      if(eachMonth === 0){firstMonth = 11; startYear = thisYear-1;}

      firstDay.setFullYear(startYear);
      firstDay.setMonth(firstMonth);   
      firstDay.setDate(26); 
      firstDay.setHours(-7); 
      firstDay.setMinutes(0);

      lastDay.setMonth(eachMonth);
      lastDay.setDate(25); 
      lastDay.setHours(16); 
      lastDay.setMinutes(59);

      let queryRecentPayments:any;

      if(eachMonth === thisMonth) {
        queryRecentPayments = {
          created_at: { $gte: firstDay, $lte: lastDay },
          amount: { $ne: null}
        }
        recentPayments = await findPayment(queryRecentPayments);
        recentPayments.slice(recentPayments.length-6);
        resetRecentPayments = recentPayments.map((eachVal:any) => {
          const timezoneDate = new Date();
          const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * 15;
          timezoneDate.setTime(timezoneSecond);
          return {
           _id : eachVal._id,
           name : eachVal.name,
           paymentWay : eachVal.paymentWay,
           amount : eachVal.amount,
           rate : eachVal.rate,
           realAmount : eachVal.realAmount,
           created_at : timezoneDate.toLocaleString()
          }
       })
      }
      
      const queryMonthlyAmount = {
      created_at: { $gte: firstDay, $lte: lastDay },
      monthlyAmount: { $ne: null}
      }
      const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
      if(monthlyAmounts.length === 0){yearlyEachMonthAmount.push(0); continue;}
      let realMonthlyAmounts:any
      monthlyAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
      realMonthlyAmounts = monthlyAmounts[0];
      yearlyTotalAmount += parseFloat(realMonthlyAmounts.monthlyAmount);
      yearlyEachMonthAmount.push(realMonthlyAmounts.monthlyAmount);
    }
    const timezoneDate = new Date();
    timezoneDate.setTime(timezoneSecond);
    
    const payment = [yearlyTotalAmount, yearlyEachMonthAmount, resetRecentPayments, timezoneDate.toLocaleDateString()];
    
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

export const getAllPaymentHistoryHandler = async (
  req: Request<getAllPayHistoryInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const timezoneSecond = Date.parse((new Date(req.params.paymentId)).toUTCString());
    const today = new Date();
    today.setTime(timezoneSecond);
    const firstDay = new Date();
    const lastDay = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    if(today.getDate() > 25){thisMonth++}
    if(today > new Date("Decemnber 25, thisYear 00:00:00")){thisYear++;}

    let yearlyRealIndividualAmount = 0;
    let yearlyTotalAmount = 0;
    let yearlyEachMonthAmount = [];
    let yearlyEachTotalAmounts:any =[];
    let monthlyEachTotalAmounts:any = [];
    let recentPayments:any;
    let resetRecentPayments:any
    
    for(let eachMonth = 0; eachMonth < 12; eachMonth++) {
      let startYear = thisYear;
      let firstMonth = eachMonth-1;
      if(eachMonth === 0){firstMonth = 11; startYear = thisYear-1;}

      firstDay.setFullYear(startYear);
      firstDay.setMonth(firstMonth);   
      firstDay.setDate(26); 
      firstDay.setHours(-7); 
      firstDay.setMinutes(0);

      lastDay.setFullYear(thisYear);
      lastDay.setMonth(eachMonth);
      lastDay.setDate(25); 
      lastDay.setHours(16); 
      lastDay.setMinutes(59);

      let queryRecentPayments:any;
      if(eachMonth === thisMonth) {
        queryRecentPayments = {
          created_at: { $gte: firstDay, $lte: lastDay },
          amount: { $ne: null}
        }
        recentPayments = await findPayment(queryRecentPayments);
        resetRecentPayments = recentPayments.map((eachVal:any) => {
          const timezoneDate = new Date();
          const timezoneSecond = Date.parse((new Date(eachVal.created_at)).toUTCString()) + 3600000 * 15;
          timezoneDate.setTime(timezoneSecond);
          return {
           _id : eachVal._id,
           name : eachVal.name,
           paymentWay : eachVal.paymentWay,
           amount : eachVal.amount,
           rate : eachVal.rate,
           realAmount : eachVal.realAmount,
           created_at : timezoneDate.toLocaleString()
          }
       })
      }
      
      const queryMonthlyAmount = {
      created_at: { $gte: firstDay, $lte: lastDay },
      monthlyAmount: { $ne: null}
      }
      const queryMonthlyEachAmount = {
        created_at: { $gte: firstDay, $lte: lastDay },
        eachMonthlyAmount: { $ne: null}
      }
      const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
      const eachMonthlyAmounts:any = await findPayment(queryMonthlyEachAmount);
      const allUsers = await findAllUsers();
      if(eachMonthlyAmounts.length === 0){yearlyEachMonthAmount.push(0); continue;}
      let realMonthlyAmounts:any
      monthlyAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
      realMonthlyAmounts = monthlyAmounts[0];
      yearlyTotalAmount += parseFloat(realMonthlyAmounts.monthlyAmount);
      yearlyEachMonthAmount.push(realMonthlyAmounts.monthlyAmount);

      let realEachMonthlyAmounts : any = [];
     
      allUsers.map((eachUser:any,key:any) => {
      let individualAmounts =  eachMonthlyAmounts.filter((value:any) => {
        return value.name === eachUser.name;
      })

      if(individualAmounts.length === 0){
        individualAmounts.push({name:eachUser.name,eachMonthlyAmount:"0",created_at:firstDay,updated_at:firstDay})
      }
      
      individualAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
      if(eachMonth === thisMonth){
        realEachMonthlyAmounts.push(individualAmounts[0]);
        monthlyEachTotalAmounts.push(realEachMonthlyAmounts);
      }
      if(yearlyEachTotalAmounts[key] === undefined){
        yearlyRealIndividualAmount = 0
      } else {
        yearlyRealIndividualAmount = yearlyEachTotalAmounts[key].yearlyIndividualAmount;
      }
      
      yearlyRealIndividualAmount += parseFloat(individualAmounts[0].eachMonthlyAmount);
      
      yearlyEachTotalAmounts[key] = {name:eachUser.name,yearlyIndividualAmount: yearlyRealIndividualAmount}
    })
    }
    const allUsers = await findAllUsers();
    const payment = [yearlyTotalAmount, yearlyEachMonthAmount, yearlyEachTotalAmounts, monthlyEachTotalAmounts[0], resetRecentPayments, allUsers];
    
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
