import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeesContext";
import { createEmployee, deleteEmployee } from "../services/employeeApi.mjs";

function Employees() {
  const { employees, setEmployees, loading } = useContext(EmployeeContext);

  const [showForm, setshowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [employeedepartment, setEmployeeDepartment] = useState("");
  const department = searchParams.get("department");
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const filteredEmployees = (employees || []).filter((employee) => {
    const matchDepartment = department
      ? employee.department === department
      : true;

    const matchSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    return matchDepartment && matchSearch;
  });
  if (loading) {
    return <h2>Loading Employees....</h2>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is Required");
      setMessage("");
      return;
    }
    if (!email.trim()) {
      setError("Email is Required");
      setMessage("");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      setMessage("");
      return;
    }
    if (!phone.trim()) {
      setError("Phone is Required");
      setMessage("");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digit");
      setMessage("");
      return;
    }

    if (!employeedepartment) {
      setError("Department is required");
      setMessage("");
      return;
    }

    if (!position.trim()) {
      setError("Position is required");
      setMessage("");
      return;
    }

    if (!salary || Number(salary) <= 0) {
      setError("Salary must be greater than 0");
      setMessage("");
      return;
    }

    const newEmployee = {
      name: name.trim(),
      email: email.trim(),
      phone: phone,
      department: employeedepartment,
      position: position,
      salary: Number(salary),
      status: status || "Active",
    };
    try {
      const data = await createEmployee(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, data.employee]);
      setMessage("Employee created Successfully");
      setError("");

      setName("");
      setEmail("");
      setEmployeeDepartment("");
      setPosition("");
      setPhone("");
      setSalary("");
      setStatus("");

      // setshowForm(false);
      console.log("Employee Created :", data.employee);
    } catch (error) {
      setError(error.message);
      setMessage("");
      console.log("Error creating employee :", error);
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee ?",
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const data = await deleteEmployee(id);
      console.log("Delete Response :", data);

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id),
      );
      setMessage(data.message);
      setError("");
    } catch (error) {
      setError(error.message);
      setMessage("");

      console.log("Error deleteing employee :", error);
    }
  };

  return (
    <div className="employee-page">
      {message && <p className="success-message">{message}</p>}

      {error && <p className="error-message">{error}</p>}
      <div className="search-box">
        <label htmlFor="search">Search Employee : </label>
        <input
          id="search"
          type="text"
          placeholder="Search by name or email.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div className="employees-header">
        <div>
          <h1>Employees</h1>
          <p>Manage all employees</p>
        </div>
        <button className="add-employee-btn" onClick={() => setshowForm(true)}>
          Add Employee
        </button>
      </div>

      <br />
      <br />
      <div className="filter-section">
        <div className="department-filter">
          <label htmlFor="filter-department">Department</label>
          <br />
          <br />
          <select
            id="filter-department"
            value={department || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setSearchParams({ department: value });
              } else {
                setSearchParams({});
              }
            }}
          >
            <option value="">All Department</option>
            <option value="IT">IT</option>
            <option value="EE">EE</option>
            <option value="AIML">AIML</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>
      <br />
      <br />
      {showForm && (
        <form className="employee-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name :</label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="Enter name :"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <br />
          <label htmlFor="phone">Phone :</label>
          <br />
          <input
            id="text"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter the phone Number :"
            required
          />
          <br />
          <br />
          <label htmlFor="email">Email :</label>
          <br />
          <input
            type="email"
            id="email"
            placeholder="Enter Email :"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="department">Department :</label>
          <br />
          <input
            type="text"
            id="department"
            placeholder="Enter Department :"
            value={employeedepartment}
            onChange={(e) => setEmployeeDepartment(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="position">Position :</label>
          <br />
          <input
            type="text"
            id="position"
            placeholder="Enter the Position :"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <br />
          <br />
          <label htmlFor="salary">Salary :</label>
          <br />
          <input
            type="number"
            id="salary"
            placeholder="Enter the salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="status">Status :</label>
          <br />
          <input
            type="text"
            id="status"
            placeholder="Enter the status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <br />
          <br />
          <button className="save-btn" type="submit">
            Save Employee
          </button>
        </form>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Action</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => {
            return (
              <tr key={employee._id}>
                <td>
                  <Link to={`/employees/${employee._id}`}>
                    <button className="view-btn">View Details</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{employee._id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
