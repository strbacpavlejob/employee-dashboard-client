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
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

function EmployeeModal(props) {
  const [employeeId, setEmployeeId] = useState("");
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const validationSchema = yup.object({
    name: yup
      .string("Enter your name")
      .min(2, "Name should be of minimum 2 characters length")
      .required("Name is required"),
    emailAddress: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    phoneNumber: yup
      .string("Enter your phone number")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    homeAddress: yup
      .string("Enter your home address")
      .min(2, "Home address should be of minimum 2 characters length")
      .required("Home address is required"),
    dateOfBirth: yup
      .mixed()
      .test("valid-date", "Please enter a valid date", (val) =>
        moment(val, "MM/DD/YYYY").isValid()
      )
      .test("is-of-age", "Employee must be 18 years or older", (val) => {
        return moment().diff(moment(val, "MM/DD/YYYY"), "year") >= 18;
      }),
    dateOfEmployment: yup
      .mixed()
      .test("valid-date", "Please enter a valid date", (val) =>
        moment(val, "MM/DD/YYYY").isValid()
      )
      .when("dateOfBirth", (dateOfBirth) => {
        if (dateOfBirth) {
          return yup
            .date()
            .min(
              moment(dateOfBirth, "MM/DD/YYYY").add(18, "y"),
              "Date of employment must be later then 18. birthday"
            );
        }
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      homeAddress: "",
      dateOfBirth: new Date(),
      dateOfEmployment: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      props.editMode ? handleEdit(values) : handleSave(values);
    },
  });

  useEffect(() => {
    if (props.editMode) {
      setEmployeeId(props.selectedEmployee.employeeId);
      const fields = [
        "name",
        "emailAddress",
        "phoneNumber",
        "homeAddress",
        "dateOfEmployment",
        "dateOfBirth",
      ];
      fields.forEach((field) =>
        formik.setFieldValue(field, props.selectedEmployee[field], true)
      );
    }
  }, [props.editMode]);

  const resetForm = () => {
    setEmployeeId("");
    formik.setErrors({});
    formik.resetForm();
  };

  const handleSave = (values) => {
    let newEmployee = {
      name: values.name,
      emailAddress: values.emailAddress,
      phoneNumber: values.phoneNumber,
      homeAddress: values.homeAddress,
      dateOfEmployment: values.dateOfEmployment,
      dateOfBirth: values.dateOfBirth,
    };
    props.save(newEmployee);
    resetForm();
  };

  const handleEdit = (values) => {
    let editedEmployee = {
      name: values.name,
      emailAddress: values.emailAddress,
      phoneNumber: values.phoneNumber,
      homeAddress: values.homeAddress,
      dateOfEmployment: values.dateOfEmployment,
      dateOfBirth: values.dateOfBirth,
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
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="emailAddress"
                name="emailAddress"
                label="Email address"
                value={formik.values.emailAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.emailAddress &&
                  Boolean(formik.errors.emailAddress)
                }
                helperText={
                  formik.touched.emailAddress && formik.errors.emailAddress
                }
              />
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
              <TextField
                fullWidth
                id="homeAddress"
                name="homeAddress"
                label="Home address"
                value={formik.values.homeAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.homeAddress &&
                  Boolean(formik.errors.homeAddress)
                }
                helperText={
                  formik.touched.homeAddress && formik.errors.homeAddress
                }
              />
              <MobileDatePicker
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of birth"
                value={formik.values.dateOfBirth}
                onChange={(newValue) => {
                  formik.setFieldValue("dateOfBirth", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth)
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                  />
                )}
              />
              <MobileDatePicker
                id="dateOfEmployment"
                name="dateOfEmployment"
                label="Date of employments"
                value={formik.values.dateOfEmployment}
                onChange={(newValue) => {
                  formik.setFieldValue("dateOfEmployment", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      formik.touched.dateOfEmployment &&
                      Boolean(formik.errors.dateOfEmployment)
                    }
                    helperText={
                      formik.touched.dateOfEmployment &&
                      formik.errors.dateOfEmployment
                    }
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.close();
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {props.editMode ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeModal;
