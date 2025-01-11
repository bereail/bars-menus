import { useEffect, useState, useCallback } from "react";
import API from "../API";

// Define un estado inicial para los datos de bares, con valores predeterminados.
const initialState = {
    page: 0,           // Página actual de los resultados.
    results: [],       // Lista de resultados (bares).
    total_pages: 0,    // Número total de páginas disponibles.
    total_results: 0,  // Número total de resultados disponibles.
};

// Define el hook personalizado `useBarFetch` para manejar la lógica de obtención de datos.
export const useBarFetch = () => {
    // Estado para manejar el término de búsqueda del usuario.
    const [searchTerm, setSearchTerm] = useState("");

    // Estado para almacenar los datos obtenidos de la API.
    const [state, setState] = useState(initialState);

    // Estado para indicar si se están cargando datos.
    const [loading, setLoading] = useState(false);

    // Estado para manejar errores durante la obtención de datos.
    const [error, setError] = useState(false);

    // Estado para indicar si se está cargando más contenido.
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Función para obtener los bares desde la API, memoizada para evitar recrearla en cada render.
    const fetchBars = useCallback(async (page, searchTerm = "") => {
        try {
            // Reinicia el estado de error y activa el indicador de carga.
            setError(false);
            setLoading(true);

            // Realiza la llamada a la API para obtener los bares.
            const bars = await API.fetchBars(searchTerm, page);

            // Actualiza el estado con los datos obtenidos.
            setState((prev) => ({
                ...bars, // Agrega los nuevos datos obtenidos.
                results: page > 1 
                    ? [...prev.results, ...bars.results] // Si no es la primera página, concatena los nuevos resultados.
                    : [...bars.results], // Si es la primera página, reemplaza los resultados existentes.
            }));
        } catch (err) {
            // Si ocurre un error, activa el indicador de error.
            setError(true);
        } finally {
            // Desactiva el indicador de carga independientemente del resultado.
            setLoading(false);
        }
    }, []); // La dependencia vacía asegura que esta función no cambie entre renders.

    // Efecto que ejecuta la obtención inicial de bares al montar el componente.
    useEffect(() => {
        fetchBars(1); // Llama a `fetchBars` con la página inicial.
    }, [fetchBars]); // Ejecuta este efecto solo si `fetchBars` cambia.

    // Efecto que ejecuta la búsqueda cuando cambia el término de búsqueda.
    useEffect(() => {
        setState(initialState); // Resetea el estado al iniciar una nueva búsqueda.
        fetchBars(1, searchTerm); // Llama a `fetchBars` con el nuevo término de búsqueda.
    }, [searchTerm, fetchBars]); // Se ejecuta cuando `searchTerm` o `fetchBars` cambian.

    // Efecto que maneja la carga de más resultados cuando `isLoadingMore` se activa.
    useEffect(() => {
        if (!isLoadingMore) return; // Si no se está cargando más, no hace nada.

        fetchBars(state.page + 1, searchTerm); // Obtiene la siguiente página de resultados.
        setIsLoadingMore(false); // Resetea el estado de carga adicional.
    }, [isLoadingMore, searchTerm, state.page, fetchBars]); // Se ejecuta cuando cambian estas dependencias.

    // Retorna el estado, funciones, y variables necesarias para usar este hook en un componente.
    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
