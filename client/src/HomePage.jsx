import useFetchData from "./hooks/useFetchData";
import SearchFilter from "./components/SearchFilter";
import useCUDfetch from "./hooks/useCUDfetch";
const HomePage = () => {
  const {
    data: employees,
    loading,
    error,
    refetch,
  } = useFetchData("http://localhost:8000/employees");

  const { handleDelete, handlePost, handleUpdate } = useCUDfetch(
    "http://localhost:8000/employees",
    refetch,
  );
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <SearchFilter
        employees={employees || []}
        onDelete={handleDelete}
        onPost={handlePost}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default HomePage;
