import { useState } from "react";
import EmployeeTable from "./EmployeeTable";

const SearchFilter = ({ employees = [] }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("select");
  let filteredData =
    filter === "all"
      ? employees
      : employees.filter((emp) => {
          return emp.designation === filter;
        });

  if (search.trim() !== "") {
    filteredData = filteredData.filter(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.phone.includes(search),
    );
  }

  if (sorting === "salary") {
    filteredData = [...filteredData].sort((a, b) => {
      return a.salary - b.salary;
    });
  }

  if (sorting === "name") {
    filteredData = [...filteredData].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name, email, phone"
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Project Manager">Project Manager</option>
      </select>

      <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
        <option value="select">Select</option>
        <option value="name">name</option>
        <option value="salary">salary</option>
      </select>
      <button>Add Employee</button>
      <EmployeeTable employees={filteredData} />
    </div>
  );
};

export default SearchFilter;
