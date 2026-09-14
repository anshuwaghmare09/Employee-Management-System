import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import EmployeeProvider from "./context/EmployeesContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </BrowserRouter>,
);
