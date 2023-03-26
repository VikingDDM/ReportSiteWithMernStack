import {
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
  } from "@typegoose/typegoose";

@pre<PcInfo>("save", function (next) {
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

export class PcInfo {
  @prop()
  id: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  deviceName: string;

  @prop({ required: true })
  hardware: string;

}

const pcInfoModel = getModelForClass(PcInfo);
export default pcInfoModel;