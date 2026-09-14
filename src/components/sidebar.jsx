import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">EM</div>
        <div>
          <h3>Employee</h3>
          <span>Management</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-title">MAIN MENU</p>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="menu-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="menu-icon">♙</span>
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/department"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="menu-icon">▦</span>
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span className="menu-icon">✓</span>
          <span>Attendance</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <p>Employee Management</p>
        <span>v1.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;