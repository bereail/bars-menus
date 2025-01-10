import React, { useEffect, useState } from "react";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchBars = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const bars = await API.fetchBars(searchTerm, page);
            setState((prev) => ({
                ...bars,
                results:
                    page > 1 ? [...prev.results, ...bars.results] : [...bars.results],
            }));
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBars(1);
    }, []);

    useEffect(() => {
        setState(initialState);
        fetchBars(1, searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        if (!isLoadingMore) return;

        fetchBars(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
