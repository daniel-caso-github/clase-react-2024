import {useEffect, useState} from "react";

interface Params<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export const useFetch = <T>(url: string) : Params<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:8000/api/users", controller);
                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const jsonData: T = await response.json();
                setData(jsonData);
                setError(null);
            } catch (error) {
                console.log(error);
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        return () => {
            controller.abort();
        }
    }, [url])

    return {data, error, loading}

}