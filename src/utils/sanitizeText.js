export const sanitizeText = (rawText) => {
  try {
    if (!rawText) {
      return "";
    }

    return rawText
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(".", "")
      .toLowerCase()
      .replace(/\s+/g, "_");
  } catch (error) {
    console.error("Error al procesar el texto:", error);
    return rawText;
  }
};
