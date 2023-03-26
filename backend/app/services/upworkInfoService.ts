import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import upworkInfoModel, { UpworkInfo } from "../models/upworkInfoModel";

export const createUpworkInfo = async ({
    input,
}: { 
    input: Partial<UpworkInfo>;
}) => {
    return upworkInfoModel.create({ ...input });
};

export const findAllUpworkInfo = async () => {
    return upworkInfoModel.find();
};

export const findAndUpdateUpworkInfo = async (
  query: FilterQuery<UpworkInfo>,
  update: UpdateQuery<UpworkInfo>,
  options: QueryOptions
) => {
  return await upworkInfoModel
    .findOneAndUpdate(query, update, options);
};

export const findOneAndDeleteUpworkInfo = async (
  query: FilterQuery<UpworkInfo>,
  options: QueryOptions = {}
) => {
  return await upworkInfoModel.findOneAndDelete(query, options);
};