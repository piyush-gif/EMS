import { useState } from "react";

const EmployeeForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [designation, setDesignation] = useState(
    initialData?.designation || "",
  );
  const [salary, setSalary] = useState(initialData?.salary || "");
  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      name,
      email,
      phone,
      designation,
      salary: Number(salary),
    };
    onSubmit(employeeData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        value={email}
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={phone}
        placeholder="Phone no."
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        value={designation}
        placeholder="designation"
        onChange={(e) => setDesignation(e.target.value)}
      />
      <input
        value={salary}
        placeholder="salary"
        onChange={(e) => setSalary(e.target.value)}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;
