import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchData(url);
	}, [url]);

	async function fetchData(url: string) {
		setIsLoading(true);

		try {
			const response = await fetch(url);

			if (!response.ok) {
				setIsLoading(false);
				setError("Something went wrong!");
				return;
			}

			const data = await response.json();
			setIsLoading(false);
			setData(data);
		} catch (err: any) {
			setIsLoading(false);
			setError('Something went wrong');
		}
	}

	return { data, isLoading, error };
}
