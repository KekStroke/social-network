import { Outlet } from "react-router-dom";
import Copyright from "../components/Copyright";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

export default function AuthRoot() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Outlet />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
