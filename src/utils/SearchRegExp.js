export const SearchRegExp = (text) => {
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };
  if (typeof text !== "string" || text.trim() === "") {
    return new RegExp(`^${escapeRegExp(text || "")}$`, "iu");
  }

  const trimmedText = text.trim();
  const parts = trimmedText
    .split(/[^a-zA-Z0-9À-ÿ]+/u)
    .filter((part) => part.length > 0);

  if (parts.length > 0) {
    const regexPatternString = parts
      .map((part) => escapeRegExp(part))
      .join("\\W*");
    return new RegExp(`^${regexPatternString}$`, "iu"); // 'i' para insensible a mayúsculas/minúsculas, 'u' para unicode
  } else {
    // Si parts está vacío (ej: text era solo "---" o "()"), hacemos una búsqueda exacta (insensible a mayúsculas)
    return new RegExp(`^${escapeRegExp(trimmedText)}$`, "iu");
  }
};
