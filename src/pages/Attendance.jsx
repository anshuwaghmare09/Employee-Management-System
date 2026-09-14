import { EmployeeContext } from "../context/EmployeesContext";
import { useContext, useState } from "react";
function Attendance() {
  const { employees } = useContext(EmployeeContext);
  const [attendance, setAttendance] = useState({});

  const totalEmployee = employees.length;

  const totalPresent = Object.values(attendance).filter(
    (status) => status == "Present",
  ).length;

  const totalAbsent = Object.values(attendance).filter(
    (status) => status == "Absent",
  ).length;

  return (
    <div className="attendance-page">
      <h1>Attendance</h1>
      <div className="attendance-summary">
        <div className="summary-card">
          <h3>Total Employees</h3>
          <p>{totalEmployee}</p>
        </div>
        <div className="summary-card">
          <h3>Present</h3>
          <p>{totalPresent}</p>
        </div>
        <div className="summary-card">
          <h3>Absent</h3>
          <p>{totalAbsent}</p>
        </div>
      </div>
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{attendance[employee.id] || "Not Marked"}</td>
                  <td>
                    <button
                      onClick={() =>
                        setAttendance({
                          ...attendance,
                          [employee.id]: "Present",
                        })
                      }
                    >
                      Present
                    </button>
                    <button
                      onClick={() =>
                        setAttendance({
                          ...attendance,
                          [employee.id]: "Absent",
                        })
                      }
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Attendance;
