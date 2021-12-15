import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";

const columns = [
  { id: "employeeId", label: "ID" },
  { id: "name", label: "Name" },
  { id: "emailAddress", label: "Email address" },
  { id: "phoneNumber", label: "Phone number" },
  { id: "homeAddress", label: "Home address" },
  { id: "dateOfEmployment", label: "Date of employment" },
  { id: "dateOfBirth", label: "Date of birth" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function EmployeeTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEmployeeEdit = (employeeId) => {
    props.employeeEdit(employeeId);
  };
  const handleEmployeeDelete = (employeeId) => {
    props.employeeDelete(employeeId);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{row.employeeId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.emailAddress}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.homeAddress}</TableCell>
                    <TableCell>{row.dateOfEmployment}</TableCell>
                    <TableCell>{row.dateOfBirth}</TableCell>

                    <TableCell>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                          handleEmployeeEdit(row.employeeId);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => {
                          handleEmployeeDelete(row.employeeId);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
