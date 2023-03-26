import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import reportModel, { Report } from "../models/reportModel";

export const createReport = async ({
    input,
    user_id
}: { 
    input: Partial<Report>;
    user_id: string;
}) => {
    return reportModel.create({ ...input, user: user_id });
};

export const findReports = async (
  query: FilterQuery<Report>,
  options: QueryOptions = {}
) => {
  return await reportModel.find(query, {}, options);
};

export const findAndUpdateReport = async (
  query: FilterQuery<Report>,
  update: UpdateQuery<Report>,
  options: QueryOptions
) => {
  return await reportModel
    .findOneAndUpdate(query, update, options)
    .populate("user");
};

export const findOneAndDelete = async (
  query: FilterQuery<Report>,
  options: QueryOptions = {}
) => {
  return await reportModel.findOneAndDelete(query, options);
};
