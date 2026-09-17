import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmployeeId } from "../services/employeeApi.mjs";

function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        console.log("Employee ID:", id);

        const response = await getEmployeeId(id);

        console.log("FULL API RESPONSE:", response);

        // Handle different backend response formats
        const employeeData =
          response?.data ||
          response?.employee ||
          response;

        console.log("EMPLOYEE DATA:", employeeData);

        setEmployee(employeeData);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!employee) {
    return (
      <div>
        <h2>Employee Not Found</h2>

        <Link to="/employees">
          <button>Back to Employees</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="employee-details-card">
      <h2>Employee Details</h2>

      <div className="employee-info">

        <p>
          <strong>Name:</strong> {employee.name}
        </p>

        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>

        <p>
          <strong>Email:</strong> {employee.email}
        </p>

        <p>
          <strong>Department:</strong> {employee.department}
        </p>

        <p>
          <strong>Position:</strong> {employee.position}
        </p>

        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>

        <p>
          <strong>Status:</strong> {employee.status}
        </p>

        <div className="details-action">

          <Link to={`/employees/${employee._id}/edit`}>
            <button className="edit-btn">
              Edit Employee
            </button>
          </Link>

          <Link to="/employees">
            <button className="back-btn">
              Back to Employees
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default EmployeeDetails;