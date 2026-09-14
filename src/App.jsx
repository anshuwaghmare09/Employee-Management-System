import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import EmployeeDetails from "./pages/EmployeeDetail";
import Department from "./pages/Department";
import "./App.css";
import EditEmployee from "./pages/EditEmployee";
import EmployeeProvider from "./context/EmployeesContext";
function App() {
  return (
    <EmployeeProvider>
      <div>
        <Navbar />
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/department" element={<Department />} />
            <Route path="/employees/:id/edit" element={<EditEmployee />} />
          </Routes>
        </main>
      </div>
    </EmployeeProvider>
  );
}
export default App;
