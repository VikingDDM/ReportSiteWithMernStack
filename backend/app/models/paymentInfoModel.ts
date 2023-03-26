import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
  } from "@typegoose/typegoose";

@pre<PaymentInfo>("save", function (next) {
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

export class PaymentInfo {
  @prop()
  id: string;

  @prop()
  username: string;

  @prop({ required: true })
  category: string;

  @prop({ required: true })
  account: string;

}

const paymentInfoModel = getModelForClass(PaymentInfo);
export default paymentInfoModel;