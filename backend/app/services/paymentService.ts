import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import paymentModel, { Payment } from "../models/paymentModel";

export const createPayment = async ({
    input,
}: { 
    input: Partial<Payment>;
}) => {
    return paymentModel.create({ ...input});
};


export const createMonthlyTotal = async ({
  monthlyTotal
}: { 
  monthlyTotal: string;
}) => {
  return paymentModel.create({ monthlyAmount: monthlyTotal});
};

export const createEachMonthlyTotal = async ({
  eachMonthlyTotal,
  eachName
}: { 
  eachMonthlyTotal: string;
  eachName: string;
}) => {
  return paymentModel.create({ eachMonthlyAmount: eachMonthlyTotal, name: eachName});
};

export const findPayment = async (
  query: FilterQuery<Payment>,
  options: QueryOptions = {}
) => {
  return await paymentModel.find(query, {}, options);
};

export const findPaymentById = async (id: string) => {
  return paymentModel.findById(id).lean();
};

export const findAndUpdatePayment = async (
  query: FilterQuery<Payment>,
  update: UpdateQuery<Payment>,
  options: QueryOptions
) => {
  return await paymentModel
    .findOneAndUpdate(query, update, options)
};

export const findOneAndDelete = async (
  query: FilterQuery<Payment>,
  options: QueryOptions = {}
) => {
  return await paymentModel.findOneAndDelete(query, options);
};