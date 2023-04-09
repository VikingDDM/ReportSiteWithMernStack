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

  @prop()
  Username: string;

  @prop()
  Payment: string;

  @prop()
  Project: string;

  @prop()
  Study: string;

  @prop()
  Extra: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const reportModel = getModelForClass(Report);
export default reportModel;