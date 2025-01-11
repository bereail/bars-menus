// Variable para almacenar el nombre del menú seleccionado
let selectedMenuName = "";

// Función para actualizar la variable
export const setSelectedMenuName = (name) => {
  selectedMenuName = name;
};

// Función para obtener el valor de la variable
export const getSelectedMenuName = () => selectedMenuName;
