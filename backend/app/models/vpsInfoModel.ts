import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
  } from "@typegoose/typegoose";

@pre<VpsInfo>("save", function (next) {
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

export class VpsInfo {
  @prop()
  id: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  vpsPassword: string;

  @prop({ required: true })
  vpsUrl: string;
}

const vpsInfoModel = getModelForClass(VpsInfo);
export default vpsInfoModel;