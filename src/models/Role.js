import { Schema, model, models } from "mongoose";

const roleSchema = new Schema(
  {
    rid: {
      type: Number,
      unique: true,
    },
    name: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export default models?.Role || model("Role", roleSchema);
