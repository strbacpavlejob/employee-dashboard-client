import { useEffect, useState } from "react";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeTable from "../components/EmployeeTable";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import {
  deleteEmployee,
  editEmployee,
  getEmployee,
  getEmployees,
  saveEmployee,
} from "../util/employee.api";

function CurrentEmployee() {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  useEffect(async () => {
    refreshData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    getEmployees().then((data) => {
      setEmployeeList(data);
      setLoading(false);
    });
  };

  const handleEmployeeAdd = () => {
    setOpenModal(true);
  };
  const handleEmployeeEdit = async (employeeId) => {
    await getEmployee(employeeId).then((data) => {
      setSelectedEmployee(data);
    });
    setEditMode(true);
    setOpenModal(true);
  };

  const handleEmployeeDelete = async (employeeId) => {
    await deleteEmployee(employeeId);
    refreshData();
  };
  const handleModalClose = () => {
    setOpenModal(false);
    setEditMode(false);
    setSelectedEmployee({});
  };
  const handleModelSave = async (data) => {
    setOpenModal(false);
    await saveEmployee(data);
    refreshData();
  };
  const handleModelEdit = async (employeeId, data) => {
    setOpenModal(false);
    setEditMode(false);
    await editEmployee(employeeId, data);
    refreshData();
  };

  return (
    <div className="App">
      <Header employeeAdd={handleEmployeeAdd} title={"Current Employees"} />
      <div className="Table">
        {loading ? (
          <Spinner />
        ) : (
          <EmployeeTable
            rows={employeeList}
            employeeEdit={handleEmployeeEdit}
            employeeDelete={handleEmployeeDelete}
          />
        )}
      </div>
      <EmployeeModal
        open={openModal}
        close={handleModalClose}
        save={handleModelSave}
        edit={handleModelEdit}
        editMode={editMode}
        selectedEmployee={selectedEmployee}
      />
    </div>
  );
}

export default CurrentEmployee;
