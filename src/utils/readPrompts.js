import fs from "fs/promises";
import path from "path";

export const readPrompts = async (title) => {
  const promptsDir = path.join(process.cwd(), "prompts");
  const filePath = path.join(promptsDir, `${title}.txt`);

  try {
    const textFile = await fs.readFile(filePath, "utf-8");
    return textFile;
  } catch (error) {
    console.error(
      `Error al leer el archivo de prompt para '${title}'.
      Ruta intentada: ${filePath}.
      Directorio de trabajo actual: ${process.cwd()}.
      Asegúrate de que el directorio 'prompts' exista en la raíz del proyecto y contenga '${title}.txt'.`,
      error
    );
    // Propaga el error para que pueda ser manejado por la función que llama.
    throw new Error(
      `No se pudo cargar el prompt '${title}'. Revisa los logs del servidor para más detalles. Ruta: ${filePath}`
    );
  }
};
