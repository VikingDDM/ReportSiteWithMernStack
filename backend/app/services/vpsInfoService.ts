import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import vpsInfoModel, { VpsInfo } from "../models/vpsInfoModel";

export const createVpsInfo = async ({
    input,
}: { 
    input: Partial<VpsInfo>;
}) => {
    return vpsInfoModel.create({ ...input });
};

export const findAllVpsInfo = async () => {
    return vpsInfoModel.find();
};

export const findAndUpdateVpsInfo = async (
  query: FilterQuery<VpsInfo>,
  update: UpdateQuery<VpsInfo>,
  options: QueryOptions
) => {
  return await vpsInfoModel
    .findOneAndUpdate(query, update, options);
};

export const findOneAndDeleteVpsInfo = async (
  query: FilterQuery<VpsInfo>,
  options: QueryOptions = {}
) => {
  return await vpsInfoModel.findOneAndDelete(query, options);
};