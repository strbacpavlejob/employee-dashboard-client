import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Add from "@material-ui/icons/Add";

function Header(props) {
  const handleEmployeeAdd = () => {
    props.employeeAdd();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Dashboard
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            handleEmployeeAdd();
          }}
        >
          <Add />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
