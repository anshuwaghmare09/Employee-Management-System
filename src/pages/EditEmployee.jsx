import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeesContext";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, setEmployees } = useContext(EmployeeContext);

  const employee = employees.find((employee) => employee.id === Number(id));

  if (!employee) {
    return <h2>Employee Not Found</h2>;
  }
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [department, setDepartment] = useState(employee.department);
  const [position, setPosition] = useState(employee.position);

  function handleUpdate(e) {
    e.preventDefault();

    const updatedEmployees = employees.map((emp) => {
      if (emp.id === Number(id)) {
        return {
          ...emp,
          name: name,
          email: email,
          department: department,
          position: position,
        };
      }
      return emp;
    });
    setEmployees(updatedEmployees);

    navigate(`/employees/${employee.id}`);
  }
  return (
    <div className="edit-employee-page">
      <h1>Edit Employees</h1>

      <form className="edit-employee-form" onSubmit={handleUpdate}>
        <div className="edit-form-group">
          <label htmlFor="name">Name :</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="edit-form-group">
          <label htmlFor="email">Email :</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="edit-form-group">
          <label htmlFor="department">Department :</label>
          <br />
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <br />
        <br />

        <div className="edit-form-group">
          <label htmlFor="position">Position :</label>
          <br />
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <br />
        <br />
        <button className="update-btn" type="submit">
          Update Employee
        </button>
        <br />
        <br />
        <button
          className="cancel-btn"
          type="button"
          onClick={() => navigate(`/employees/${id}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
