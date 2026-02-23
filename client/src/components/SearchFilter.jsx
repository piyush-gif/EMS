import { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";

const SearchFilter = ({ employees = [], onDelete, onPost, onUpdate }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("select");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter, sorting]);
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

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  return (
    <div className="search-filter">
      <div className="controls">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, phone"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
        </select>
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="select">Select</option>
          <option value="name">Name</option>
          <option value="salary">Salary</option>
        </select>
        <button className="btn-add" onClick={() => setShowAddForm(true)}>
          Add Employee
        </button>
      </div>

      {showAddForm && (
        <EmployeeForm
          onSubmit={(data) => {
            onPost(data);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingEmployee && (
        <EmployeeForm
          initialData={editingEmployee}
          onSubmit={(data) => {
            onUpdate(editingEmployee.id, data);
            setEditingEmployee(null);
          }}
          onCancel={() => setEditingEmployee(null)}
        />
      )}

      <EmployeeTable
        employees={paginatedData}
        onDelete={onDelete}
        onUpdate={setEditingEmployee}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
