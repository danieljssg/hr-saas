import { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";

const candidateSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
    },

    lastname: {
      type: String,
      required: true,
      lowercase: true,
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
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

candidateSchema.statics.checkUniqueFields = async function (username, dni) {
  const User = this;

  // Verificar si ya existe un documento con el mismo username, dni o id_number
  const userWithSameUsername = await User.findOne({
    $or: [{ dni }, { username }],
  });
  if (userWithSameUsername) {
    throw new Error(
      "Ya existe un usuario con estos datos. Por favor, verifique e intente de nuevo."
    );
  }
};

candidateSchema.statics.encryptPassword = async (password) => {
  const textPassword = password ? password : process.env.DEFAULT_PASSWORD;
  const salt = await bcryptjs.genSaltSync(10);
  const hashPassword = await bcryptjs.hashSync(textPassword, salt);

  return hashPassword;
};

candidateSchema.statics.comparePassword = async (
  password,
  receivedPassword
) => {
  return await bcryptjs.compareSync(password, receivedPassword);
};

export default models?.Candidate || model("Candidate", candidateSchema);
