const EmployeeTable = ({ employees = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>phone</th>
          <th>designation</th>
          <th>salary</th>
          <th>created at</th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          employees.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.designation}</td>
                <td>{emp.salary}</td>
                <td>{emp.created_at}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
