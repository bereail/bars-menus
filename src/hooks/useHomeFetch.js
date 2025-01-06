import React, { useEffect, useState, useRef } from "react";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0, 
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    console.log(searchTerm)
    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            console.log(movies);

            setState(prev => ({
                ...movies, 
                results: 
                    page > 1 ?  [...prev.results, ...movies.results] : [...movies.results]
            }));

        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    // Búsqueda inicial
    useEffect(() => {
        fetchMovies(1);
    }, []);

    // Ejecutar cuando `searchTerm` cambie
    useEffect(() => {
        setState(initialState); // Reinicia el estado al realizar una nueva búsqueda
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //load more
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchMovies(state.page + 1, searchTerm)
        setIsLoadingMore(false);
    }, [isLoadingMore], searchTerm, state.page)


    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};