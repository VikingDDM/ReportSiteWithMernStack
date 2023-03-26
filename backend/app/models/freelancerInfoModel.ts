import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
  } from "@typegoose/typegoose";

@pre<FreelancerInfo>("save", function (next) {
  this.id = this._id;
  next();
})

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

export class FreelancerInfo {
  @prop()
  id: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  account: string;

}

const freelancerInfoModel = getModelForClass(FreelancerInfo);
export default freelancerInfoModel;