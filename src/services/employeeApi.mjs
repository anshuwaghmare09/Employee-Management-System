import axios from "axios";

const API_URL = "http://localhost:5000/api/employee";

const getEmployee = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getEmployeeId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);

  console.log("GET EMPLOYEE:", response.data);

  return response.data;
};

const createEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData);
  return response.data;
};

const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    employeeData
  );

  return response.data;
};

const deleteEmployee = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};

export {
  getEmployee,
  getEmployeeId,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};