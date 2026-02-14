import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(url);
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();

      setData(data);
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
