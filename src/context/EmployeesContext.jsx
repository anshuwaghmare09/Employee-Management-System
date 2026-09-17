import { createContext, useState, useEffect } from "react";
import { getEmployee } from "../services/employeeApi.mjs";

export const EmployeeContext = createContext();

function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployee();
        console.log("Context API Response :", data);

        setEmployees(data.employee || []);
      } catch (error) {
        console.log("Error fetching employees ", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, loading }}>
      {children}
    </EmployeeContext.Provider>
  );
}
export default EmployeeProvider;
