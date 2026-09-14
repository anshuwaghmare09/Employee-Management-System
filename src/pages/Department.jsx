import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeesContext";
import { Link } from "react-router-dom";
function Department() {
  const { employees } = useContext(EmployeeContext);
  const departments = ["IT", "HR", "Finance", "EE"];
  return (
    <div className="department-page">
      <h1>Department</h1>
      <div className="department-cards">
        <div className="department-container">
          {departments.map((department) => {
            const totalEmployees = employees.filter(
              (employee) => employee.department === department,
            ).length;

            return (
              <div className="department-card" key={department}>
                <h2>{department}</h2>
                <p>Total Employees : {totalEmployees}</p>

                <Link to={`/employees?department =${department}`}>
                  <button className="department-btn">View Employees</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Department;
