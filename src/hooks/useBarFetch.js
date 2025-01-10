import { useEffect, useState, useCallback } from "react";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const useBarFetch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchBars = useCallback(async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const bars = await API.fetchBars(searchTerm, page);
            setState((prev) => ({
                ...bars,
                results: page > 1 ? [...prev.results, ...bars.results] : [...bars.results],
            }));
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch inicial
    useEffect(() => {
        fetchBars(1);
    }, [fetchBars]);

    // Búsqueda
    useEffect(() => {
        setState(initialState); // Resetear estado
        fetchBars(1, searchTerm);
    }, [searchTerm, fetchBars]);

    // Carga de más datos
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchBars(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page, fetchBars]);

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
