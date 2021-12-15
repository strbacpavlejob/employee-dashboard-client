import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";

function EmployeeModal(props) {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [dateOfEmployment, setDateOfEmployment] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  useEffect(() => {
    setEmployeeId(props.selectedEmployee.employeeId);
    setName(props.selectedEmployee.name);
    setEmailAddress(props.selectedEmployee.emailAddress);
    setPhoneNumber(props.selectedEmployee.phoneNumber);
    setHomeAddress(props.selectedEmployee.homeAddress);
    setDateOfEmployment(props.selectedEmployee.dateOfEmployment);
    setDateOfBirth(props.selectedEmployee.dateOfBirth);
  }, [props.editMode]);

  const resetForm = () => {
    setEmployeeId("");
    setName("");
    setEmailAddress("");
    setPhoneNumber("");
    setHomeAddress("");
    setDateOfEmployment("");
    setDateOfBirth("");
  };

  const handleSave = () => {
    let newEmployee = {
      name: name,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      homeAddress: homeAddress,
      dateOfEmployment: dateOfEmployment,
      dateOfBirth: dateOfEmployment,
    };
    props.save(newEmployee);
    resetForm();
  };

  const handleEdit = () => {
    let editedEmployee = {
      name: name,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      homeAddress: homeAddress,
      dateOfEmployment: dateOfEmployment,
      dateOfBirth: dateOfEmployment,
    };
    props.edit(employeeId, editedEmployee);
    resetForm();
  };

  return (
    <div>
      <Dialog open={props.open} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>
          {props.editMode === true ? `Edit Employee` : `Add new Employee`}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack component="form" noValidate spacing={3} width="500">
              <TextField
                autoFocus
                id="name"
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                autoFocus
                id="emailAddress"
                label="Email address"
                value={emailAddress}
                onChange={(event) => setEmailAddress(event.target.value)}
                fullWidth
                variant="standard"
                type="email"
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                id="phoneNumber"
                label="Phone number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 100 }}
              />

              <TextField
                autoFocus
                id="homeAddress"
                label="Home address"
                value={homeAddress}
                onChange={(event) => setHomeAddress(event.target.value)}
                fullWidth
                variant="standard"
                inputProps={{ maxLength: 100 }}
              />
              <MobileDatePicker
                label="Date of employment"
                value={dateOfEmployment}
                onChange={(newValue) => {
                  if (newValue <= new Date()) {
                    setDateOfEmployment(newValue);
                  }
                }}
                maxDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
              <MobileDatePicker
                label="Date of birth"
                value={dateOfBirth}
                onChange={(newValue) => {
                  if (newValue <= new Date()) {
                    setDateOfBirth(newValue);
                  }
                }}
                maxDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.close();
            }}
          >
            Cancel
          </Button>
          {props.editMode === true ? (
            <Button
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleSave();
              }}
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeModal;
