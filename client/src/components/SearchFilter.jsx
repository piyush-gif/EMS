import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";

const SearchFilter = ({ employees = [], onDelete, onPost, onUpdate }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sorting, setSorting] = useState("select");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
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
      <button onClick={() => setShowAddForm(true)}>Add Employee</button>
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
        employees={filteredData}
        onDelete={onDelete}
        onUpdate={setEditingEmployee}
      />
    </div>
  );
};

export default SearchFilter;
