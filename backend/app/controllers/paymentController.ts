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
      console.log(req.body)
      
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
          monthlyPay += parseInt(eachPayment.amount) 
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
          eachMonthlyPay += parseInt(eachPayment.amount) 
        ));
        const eachMonthlyTotal = eachMonthlyPay.toString();
        const a = await findAndUpdatePayment(
          { created_at:  { $gte: firstMoment, $lte: secondMoment }, eachMonthlyAmount: { $ne: null}},
          { eachMonthlyAmount: eachMonthlyTotal},
          {}
        );
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
            monthlyPay += parseInt(eachPayment.amount) 
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
            eachMonthlyPay += parseInt(eachPayment.amount) 
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
    const today = new Date();
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
      if (p1.updated_at < p2.updated_at) return 1;
      if (p1.updated_at > p2.updated_at) return -1;
      return 0;
    });

    realMonthlyAmounts = monthlyAmounts[0];
    
    const realMonthlyPayPlan:any = [];
    monthlyPayPlan.sort( (p1:any, p2:any) => {
      if (p1.created_at > p2.created_at) return -1;
      if (p1.created_at < p2.created_at) return 1;
      return 0;
    });
    monthlyPayPlan.sort( (p1:any, p2:any) => {
      if (p1.name < p2.name) return 1;
      if (p1.name > p2.name) return -1;
      return 0;
    });
    monthlyPayPlan.push(monthlyPayPlan[0])

    let planNums : any = [];
    let planNum = 1;
    monthlyPayPlan.map((eachPlan, key) => {
      if(key-1 >= 0)
      if(eachPlan.name === monthlyPayPlan[key-1].name){ planNum++ }
      else {planNums.push(planNum); planNum = 1}
      
    })
    let planNumArg = 0;
    planNums.map((eachPlanNum:any) => {
      planNumArg += eachPlanNum
      if(today.getDate() <= 24){
        if(eachPlanNum === thisMonth + 1){realMonthlyPayPlan.push(monthlyPayPlan[planNumArg])}
      } else {
        if(eachPlanNum === thisMonth + 2){realMonthlyPayPlan.push(monthlyPayPlan[planNumArg])}
      }
      
    })
    realMonthlyPayPlan.map((eachPlan:any) => {
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
    const payment = [realMonthlyAmounts, realEachMonthlyAmounts, realMonthlyPayPlan, allUsers]
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
    const today = new Date();
    const firstDay = new Date();
    const lastDay = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    if(today.getDate() > 25){thisMonth++}
    if(today > new Date("Decemnber 25, thisYear 00:00:00")){thisYear++;}

    let yearlyTotalAmount = 0;
    let yearlyEachMonthAmount = [];
    let recentPayments:any;
    
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
      }
      
      const queryMonthlyAmount = {
      created_at: { $gte: firstDay, $lte: lastDay },
      monthlyAmount: { $ne: null}
      }
      const monthlyAmounts:any = await findPayment(queryMonthlyAmount);
      
      let realMonthlyAmounts:any
      monthlyAmounts.sort( (p1:any, p2:any) => {
        if (p1.updated_at < p2.updated_at) return 1;
        if (p1.updated_at > p2.updated_at) return -1;
        return 0;
      });
      realMonthlyAmounts = monthlyAmounts[0];
      yearlyTotalAmount += parseInt(realMonthlyAmounts.monthlyAmount);
      yearlyEachMonthAmount.push(realMonthlyAmounts.monthlyAmount);
    }
    
    const payment = [yearlyTotalAmount, yearlyEachMonthAmount, recentPayments];
    
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
    const today = new Date(req.params.paymentId);
    console.log(today)
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
      yearlyTotalAmount += parseInt(realMonthlyAmounts.monthlyAmount);
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
      
      yearlyRealIndividualAmount += parseInt(individualAmounts[0].eachMonthlyAmount);
      
      yearlyEachTotalAmounts[key] = {name:eachUser.name,yearlyIndividualAmount: yearlyRealIndividualAmount}
    })
    }
    const payment = [yearlyTotalAmount, yearlyEachMonthAmount, yearlyEachTotalAmounts, monthlyEachTotalAmounts[0], recentPayments];
    
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
