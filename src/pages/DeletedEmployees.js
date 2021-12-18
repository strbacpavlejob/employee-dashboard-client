import { useEffect, useState } from "react";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeTable from "../components/EmployeeTable";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getDeletedEmployees } from "../util/employee.api";

function DeletedEmployees() {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    refreshData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    getDeletedEmployees().then((data) => {
      setEmployeeList(data);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <Header employeeAdd={() => {}} title={"Deleted Employees"} isDeleted />
      <div className="Table">
        {loading ? (
          <Spinner />
        ) : (
          <EmployeeTable
            rows={employeeList}
            employeeEdit={() => {}}
            employeeDelete={() => {}}
            isDeleted={true}
          />
        )}
      </div>
    </div>
  );
}

export default DeletedEmployees;
