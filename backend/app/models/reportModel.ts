import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Ref,
    Severity,
  } from "@typegoose/typegoose";
import { User } from "./userModel";

@pre<Report>("save", function (next) {
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

export class Report {
  @prop()
  id: string;

  @prop({ required: true })
  Username: string;

  @prop({ required: true })
  Payment: string;

  @prop({ required: true })
  Project: string;

  @prop({ required: true })
  Study: string;

  @prop({ required: true })
  Extra: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const reportModel = getModelForClass(Report);
export default reportModel;