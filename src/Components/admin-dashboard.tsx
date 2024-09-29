import { Button } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function AdminDashboard() {
  const [cookies, setCookies, removeCookies] = useCookies(["admin_email"]);
  let navigate = useNavigate();

  // Fetch admin user data once when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/admin-users/${cookies["admin_email"]}`)
      .then((response) => {
        console.log(response.data);
      });
  }, [cookies]);

  // Sign out and redirect to login
  function handleSignOut() {
    removeCookies("admin_email");
    navigate("/admin-login", { replace: true });
    window.location.reload();
    return;
  }

  return (
    <div className="container-fluid">
      {/* Responsive Navbar */}
      <nav className="d-flex flex-wrap justify-content-between align-items-center bg-light text-dark p-3">
        <span className="fs-5 flex-grow-1">
          Welcome, {cookies["admin_email"] ? cookies["admin_email"] : "Admin"}
        </span>

        <Button
          onClick={handleSignOut}
          variant="outlined"
          color="error"
          className="d-flex align-items-center p-2 fw-bold"
        >
          <span className="me-2">Log Out</span>
          <i className="bi bi-box-arrow-right"></i> {/* Bootstrap icon */}
        </Button>
      </nav>

      <div className="d-flex mt-4 justify-content-start">
        <Button variant="contained" color="info" className="m-2 fw-bold fs-5">
          Create Employee
        </Button>
      </div>
    </div>
  );
}
