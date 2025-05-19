import { Schema, model, models } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    dni: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    initials: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    deleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

export default models?.Employee || model("Employee", employeeSchema);
