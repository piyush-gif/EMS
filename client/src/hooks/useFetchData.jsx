import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("access_token");
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refresh_token");
        const refreshResponse = await fetch("http://localhost:8000/refresh", {
          method: "POST",
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (!refreshResponse.ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return;
        }

        const refreshData = await refreshResponse.json();
        localStorage.setItem("access_token", refreshData.access_token);

        const retryResponse = await fetch(url, {
          headers: { Authorization: `Bearer ${refreshData.access_token}` },
        });
        const data = await retryResponse.json();
        setData(data);
        return;
      }

      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
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
