"use server";
import { saveFile } from "../saveFile";
import { revalidatePath } from "next/cache";

export const NewJobAction = async (prevState, formData) => {
  try {
    const position = formData.get("position");
    const file = formData.get("pdfFile");

    const uploadFile = await saveFile(file, "jobs");
    if (uploadFile.upload === false) {
      return {
        message: uploadFile.message,
        ok: false,
      };
    }

    // if (res.success === true) {
    //   revalidatePath("/orgazacion/cargos");
    //   return {
    //     message: res.message,
    //     ok: true,
    //   };
    // } else if (res.success === false) {
    //   return {
    //     message: res.message,
    //     ok: false,
    //   };
    // }
    return {
      message: "res.message",
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return { message: error.message, ok: false, resume: null };
  }
};
