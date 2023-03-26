import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import paymentModel, { Payment } from "../models/paymentModel";

export const createPayment = async ({
    input
}: { 
    input: Partial<Payment>;
}) => {
    return paymentModel.create({ ...input});
};


export const findPayment = async (
  query: FilterQuery<Payment>,
  options: QueryOptions = {}
) => {
  return await paymentModel.find(query, {}, options);
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