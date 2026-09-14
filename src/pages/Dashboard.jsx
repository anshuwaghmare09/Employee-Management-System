import  { useContext } from "react";
import { EmployeeContext } from "../context/EmployeesContext";

const Dashboard = () => {
  const { employees } = useContext(EmployeeContext);

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const onLeaveEmployees = employees.filter(
    (employee) =>
      employee.status === "On Leave" || employee.status === "Leave"
  ).length;

  const departments = [
    "IT",
    "HR",
    "Finance",
    "EE",
  ];

  const departmentCounts = departments.map((department) => ({
    name: department,
    count: employees.filter(
      (employee) => employee.department === department
    ).length,
  }));

  const recentEmployees = [...employees].slice(-5).reverse();

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-welcome">
            Welcome back 👋
          </span>

          <h1>Employee Dashboard</h1>

          <p>
            Here's what's happening with your organization today.
          </p>
        </div>

        <div className="dashboard-date">
          <span>Today</span>
          <strong>
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>

      </div>


      {/* ================= STAT CARDS ================= */}

      <div className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-card-top">
            <div className="stat-icon blue">
              👥
            </div>

            <span className="stat-label">
              Total Employees
            </span>
          </div>

          <h2>{totalEmployees}</h2>

          <p className="stat-description">
            Employees in organization
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-card-top">
            <div className="stat-icon green">
              ✓
            </div>

            <span className="stat-label">
              Active Employees
            </span>
          </div>

          <h2>{activeEmployees}</h2>

          <p className="stat-description">
            Currently active
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-card-top">
            <div className="stat-icon purple">
              🏢
            </div>

            <span className="stat-label">
              Departments
            </span>
          </div>

          <h2>{departments.length}</h2>

          <p className="stat-description">
            Active departments
          </p>

        </div>


        <div className="stat-card">

          <div className="stat-card-top">
            <div className="stat-icon orange">
              ⏱
            </div>

            <span className="stat-label">
              On Leave
            </span>
          </div>

          <h2>{onLeaveEmployees}</h2>

          <p className="stat-description">
            Currently on leave
          </p>

        </div>

      </div>


      {/* ================= OVERVIEW ================= */}

      <div className="dashboard-overview">


        {/* Employee Overview */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Employee Overview</h2>

              <p>
                Current employee statistics
              </p>
            </div>

          </div>


          <div className="employee-overview">

            <div className="overview-main">

              <span>Total Employees</span>

              <strong>
                {totalEmployees}
              </strong>

            </div>


            <div className="overview-progress">

              <div className="progress-info">

                <span>Active Employees</span>

                <strong>
                  {activeEmployees}
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      totalEmployees > 0
                        ? `${(activeEmployees / totalEmployees) * 100}%`
                        : "0%",
                  }}
                />

              </div>

            </div>


            <div className="overview-progress">

              <div className="progress-info">

                <span>On Leave</span>

                <strong>
                  {onLeaveEmployees}
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill leave"
                  style={{
                    width:
                      totalEmployees > 0
                        ? `${(onLeaveEmployees / totalEmployees) * 100}%`
                        : "0%",
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Department Overview */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Department Overview</h2>

              <p>
                Employees by department
              </p>
            </div>

          </div>


          <div className="department-overview">

            {departmentCounts.map((department) => (

              <div
                className="department-row"
                key={department.name}
              >

                <div className="department-name">

                  <span className="department-dot" />

                  <span>
                    {department.name}
                  </span>

                </div>

                <strong>
                  {department.count}
                </strong>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* ================= RECENT EMPLOYEES ================= */}

      <div className="dashboard-panel recent-employees">

        <div className="panel-header">

          <div>
            <h2>Recent Employees</h2>

            <p>
              Recently added employees
            </p>
          </div>

        </div>


        {recentEmployees.length === 0 ? (

          <div className="empty-state">
            <div className="empty-icon">
              👤
            </div>

            <h3>No employees yet</h3>

            <p>
              Add your first employee to see them here.
            </p>
          </div>

        ) : (

          <div className="recent-employee-list">

            {recentEmployees.map((employee) => (

              <div
                className="recent-employee"
                key={employee.id || employee._id || employee.email}
              >

                <div className="employee-avatar">

                  {employee.name
                    ? employee.name.charAt(0).toUpperCase()
                    : "E"}

                </div>


                <div className="recent-employee-info">

                  <strong>
                    {employee.name}
                  </strong>

                  <span>
                    {employee.email}
                  </span>

                </div>


                <div className="recent-employee-department">

                  {employee.department || "N/A"}

                </div>


                <div
                  className={`employee-status ${
                    employee.status === "Active"
                      ? "active"
                      : "leave"
                  }`}
                >

                  {employee.status || "Unknown"}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;