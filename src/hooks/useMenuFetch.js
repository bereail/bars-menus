import { useState, useEffect } from "react";
import API from "../path-to-api-file"; // Ajusta la ruta según tu estructura de archivos

export const useMenuFetch = () => {
  const [state, setState] = useState({
    results: [],
    page: 1,
    total_pages: 1,
    total_results: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMenus = async (page = 1) => {
    try {
      setLoading(true);
      const data = await API.fetchBars("", page); // Llama al método de la API
      setState((prev) => ({
        ...data,
        results: page > 1 ? [...prev.results, ...data.results] : [...data.results],
      }));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch inicial
  useEffect(() => {
    fetchMenus();
  }, []);

  // Fetch adicional cuando isLoadingMore cambie
  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMenus(state.page + 1);
    setIsLoadingMore(false);
  }, [isLoadingMore, state.page]);

  return { state, loading, error, setIsLoadingMore };
};
