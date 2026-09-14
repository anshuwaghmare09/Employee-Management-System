import { createContext, useState } from "react";
import employeesData from "../data/Employees";

export const EmployeeContext = createContext();

function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(employeesData);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}
export default EmployeeProvider;
