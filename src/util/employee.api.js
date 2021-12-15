import ApiClient from "./ApiClient";

const getEmployees = () =>
  new Promise((resolve, reject) => {
    ApiClient.get(`http://localhost:3000/employee`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const getDeletedEmployees = () =>
  new Promise((resolve, reject) => {
    ApiClient.get(`http://localhost:3000/employee/deleted`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const getEmployee = (employeeId) =>
  new Promise((resolve, reject) => {
    ApiClient.get(`http://localhost:3000/employee/${employeeId}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

const saveEmployee = (data) =>
  new Promise((resolve, reject) => {
    ApiClient.post(`http://localhost:3000/employee/`, data)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
const editEmployee = (employeeId, data) =>
  new Promise((resolve, reject) => {
    ApiClient.patch(`http://localhost:3000/employee/${employeeId}`, data)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

const deleteEmployee = (employeeId) =>
  new Promise((resolve, reject) => {
    ApiClient.delete(`http://localhost:3000/employee/${employeeId}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
export {
  getEmployees,
  getEmployee,
  getDeletedEmployees,
  saveEmployee,
  editEmployee,
  deleteEmployee,
};
