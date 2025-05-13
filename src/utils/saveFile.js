import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { sanitizeText } from "./sanitizeText";
import { v4 as uuidv4 } from "uuid";

export const saveFile = async (file) => {
  try {
    if (!file || file.size === 0) {
      return { success: false, error: "No se ha seleccionado ningún archivo" };
    }

    if (file.type !== "application/pdf") {
      return { success: false, error: "Solo se permiten archivos PDF" };
    }

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filename = `${uuidv4()}.pdf`;
    const filePath = path.join(uploadsDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    return {
      upload: true,
      path: `/uploads/${filename}`,
      message: "Archivo subido correctamente",
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      upload: false,
      message: "Error al subir el archivo: " + error.message,
      path: null,
    };
  }
};
