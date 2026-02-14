import { useState } from "react";

const useCUDfetch = (url, refetch) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to get response");
      if (refetch) refetch();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (employeeData) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error("Failed to add");
      if (refetch) refetch();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, employeeData) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok) throw new Error("Failed to get response");
      if (refetch) refetch();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, handleDelete, handlePost, handleUpdate };
};

export default useCUDfetch;
