import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeesContext";
import { getEmployeeId, updateEmployee } from "../services/employeeApi.mjs";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setEmployees } = useContext(EmployeeContext);

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployeeId(id);
        setEmployee(data.employee);
        setName(data.employee.name);
        setEmail(data.employee.email);
        setDepartment(data.employee.department);
        setPosition(data.employee.position);
        setPhone(data.employee.phone);
        setSalary(data.employee.salary);
        setStatus(data.employee.status);
      } catch (error) {
        console.log("Error Fetching employee :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [id]);
  if (loading) {
    return <h2>Loading</h2>;
  }
  if (!employee) {
    return <h2>Employee Not Found</h2>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        name: name,
        email: email,
        department: department,
        position: position,
        phone: phone,
        salary: Number(salary),
        status,
      };
      const data = await updateEmployee(id, updateData);
      console.log("Update Employee :", data);
      setEmployees((prevEmployees) => {
        prevEmployees.map((employee) =>
          employee._id === id ? data.employee : employee,
        );
      });
      navigate(`/employees/${id}`);
    } catch (error) {
      console.log("Error updating Employees :", error);
    }
  };
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
        <div className="edit-form-group">
          <label htmlFor="phone">Phone :</label>
          <br />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="edit-form-group">
          <label htmlFor="salary">Salary :</label>
          <br />
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="edit-form-group">
          <label htmlFor="stauts">Status :</label>
          <br />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
