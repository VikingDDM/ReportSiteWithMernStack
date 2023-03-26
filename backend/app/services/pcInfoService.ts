import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import pcInfoModel, { PcInfo } from "../models/pcInfoModel";

export const createPcInfo = async ({
    input,
}: { 
    input: Partial<PcInfo>;
}) => {
    return pcInfoModel.create({ ...input });
};

export const findAllPcInfo = async () => {
    return pcInfoModel.find();
};

export const findAndUpdatePcInfo = async (
  query: FilterQuery<PcInfo>,
  update: UpdateQuery<PcInfo>,
  options: QueryOptions
) => {
  return await pcInfoModel
    .findOneAndUpdate(query, update, options);
};

export const findOneAndDeletePcInfo = async (
  query: FilterQuery<PcInfo>,
  options: QueryOptions = {}
) => {
  return await pcInfoModel.findOneAndDelete(query, options);
};