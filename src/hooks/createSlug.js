const slugify = (text) => {
  return text
    .toLowerCase() // Convierte el texto a minúsculas
    .trim() // Elimina espacios al inicio y al final
    .replace(/[\s]+/g, "-") // Reemplaza espacios por guiones
    .replace(/[^\w-]+/g, ""); // Elimina caracteres especiales
};

export default slugify;