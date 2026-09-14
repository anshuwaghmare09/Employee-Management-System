import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeesContext";

function EmployeeDetails() {
  const { employees } = useContext(EmployeeContext);
  const { id } = useParams();

  const employee = employees.find((employee) => employee.id === Number(id));

  if (!employee) {
    return <h2>Employees Not Found</h2>;
  }
  return (
    <div className="employee-details-card">
      <h2>Employee Details</h2>

      <div className="employee-info">
        <p>Employee ID : {employee.id}</p>
        <p>Name : {employee.name}</p>
        <p>Email : {employee.email}</p>
        <p>Department : {employee.department}</p>
        <p>Position : {employee.position}</p>
        <div className="details-action">
          <Link to={`/employees/${employee.id}/edit`}>
            <button className="edit-btn">Edit Employee</button>
          </Link>

          <Link to="/employees">
            <button className="back-btn">Back to Employees</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default EmployeeDetails;
