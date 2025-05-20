"use server";
import { revalidatePath } from "next/cache";
import { saveFile } from "../saveFile";
import { createJob } from "../server";

export const NewJobAction = async (prevState, formData) => {
  try {
    const jobName = formData.get("jobName");
    const file = formData.get("pdfFile");

    const uploadFile = await saveFile(file, "jobs");
    if (uploadFile.upload === false) {
      return {
        message: uploadFile.message,
        ok: false,
      };
    }

    const res = await createJob({
      jobName: jobName,
      file: uploadFile.path,
    });

    if (res.success === true) {
      revalidatePath("/orgazacion/cargos");
      return {
        message: res.message,
        ok: true,
      };
    } else if (res.success === false) {
      return {
        message: res.message,
        ok: false,
      };
    }
  } catch (error) {
    console.log(error);
    return { message: error.message, ok: false };
  }
};
