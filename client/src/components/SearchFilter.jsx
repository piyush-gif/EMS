import { useState } from "react";
import EmployeeTable from "./EmployeeTable";

const SearchFilter = ({ employees = [] }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filteredData =
    filter === "all"
      ? employees
      : employees.filter((emp) => {
          return emp.designation === filter;
        });
  const handleSearch = () => {};
  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>search</button>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Project Manager">Project Manager</option>
      </select>
      <button>Add Employee</button>
      <EmployeeTable employees={filteredData} />
    </div>
  );
};

export default SearchFilter;
