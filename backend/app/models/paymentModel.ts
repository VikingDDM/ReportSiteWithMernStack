import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
  } from "@typegoose/typegoose";

@pre<Payment>("save", function (next) {
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

export class Payment {
  @prop()
  id: string;

  @prop()
  name: string;

  @prop()
  plan: string;

  @prop()
  paymentWay: string;

  @prop()
  realAmount: string;

  @prop()
  rate: string;

  @prop()
  amount: string;

  @prop()
  monthlyAmount: string;

  @prop()
  eachMonthlyAmount: string;
  
}

const paymentModel = getModelForClass(Payment);
export default paymentModel;