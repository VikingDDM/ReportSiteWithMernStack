import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import freelancerInfoModel, { FreelancerInfo } from "../models/freelancerInfoModel";

export const createFreelancerInfo = async ({
    input,
}: { 
    input: Partial<FreelancerInfo>;
}) => {
    return freelancerInfoModel.create({ ...input });
};

export const findAllFreelancerInfo = async () => {
    return freelancerInfoModel.find();
};

export const findAndUpdateFreelancerInfo= async (
  query: FilterQuery<FreelancerInfo>,
  update: UpdateQuery<FreelancerInfo>,
  options: QueryOptions
) => {
  return await freelancerInfoModel
    .findOneAndUpdate(query, update, options);
};

export const findOneAndDeleteFreelancerInfo = async (
  query: FilterQuery<FreelancerInfo>,
  options: QueryOptions = {}
) => {
  return await freelancerInfoModel.findOneAndDelete(query, options);
};