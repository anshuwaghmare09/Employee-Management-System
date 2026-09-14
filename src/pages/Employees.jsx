import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeesContext";

function Employees() {
  const { employees, setEmployees } = useContext(EmployeeContext);

  const [showForm, setshowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [employeedepartment, setEmployeeDepartment] = useState("");
  const department = searchParams.get("department");
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const matchDepartment = department
      ? employee.department === department
      : true;

    const matchSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase());

    return matchDepartment && matchSearch;
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newEmployee = {
      id: employees.length + 1,
      name: name,
      email: email,
      department: employeedepartment,
      position: position,
    };

    setEmployees([...employees, newEmployee]);

    setName("");
    setEmail("");
    setEmployeeDepartment("");
    setPosition("");

    setshowForm(false);
  }
  function handleDelete(id) {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  }

  return (
    <div className="employee-page">
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
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>
      <br /><br />
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
              <tr key={employee.id}>
                <td>
                  <Link to={`/employees/${employee.id}`}>
                    <button className="view-btn">View Details</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>{employee.id}</td>
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
