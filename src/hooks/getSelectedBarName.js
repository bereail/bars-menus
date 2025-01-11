// Variable global para almacenar el nombre del bar seleccionado
let selectedBarName = "";

// Función para actualizar el nombre del bar seleccionado
export const setSelectedBarName = (name) => {
  selectedBarName = name;
};

// Función para obtener el nombre del bar seleccionado
export const getSelectedBarName = () => selectedBarName;
