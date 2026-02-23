const EmployeeTable = ({ employees = [], onDelete, onUpdate }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>phone</th>
          <th>designation</th>
          <th>salary</th>
          <th>created at</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          employees.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary}</td>
              <td>{new Date(emp.created_at).toISOString().split("T")[0]}</td>
              <td>
                <button className="btn-edit" onClick={() => onUpdate(emp)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
