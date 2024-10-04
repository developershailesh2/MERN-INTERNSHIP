import { Button, Pagination, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { EmpContract } from "../Contracts/emp_contract";

export function AdminDashboard() {
  const [cookies, setCookies, removeCookies] = useCookies(["admin_email"]);
  const [employees, setEmployees] = useState<EmpContract[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const navigate = useNavigate();

  // Fetch employee data
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/all-employee/${cookies["admin_email"]}`)
      .then((response) => setEmployees(response.data));
  }, [cookies]);

  const handleSignOut = (): void => {
    removeCookies("admin_email");
    navigate("/admin-login", { replace: true });
    window.location.reload();
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.emp_name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <div className="container-fluid bg-light p-3">
      {/* Navbar */}
      <nav className="d-flex flex-wrap justify-content-between bg-dark text-white p-3 rounded">
        <Typography variant="h6">
          Welcome, {cookies["admin_email"] || "Admin"}
        </Typography>
        <Button variant="contained" color="error" onClick={handleSignOut}>
          <span className="p-2">Log Out</span> <LockIcon />
        </Button>
      </nav>

      {/* Create New Employee Button */}
      <div className="d-flex justify-content-start my-4">
        <Button variant="contained" color="info" className="fw-bold">
          <Link to="/add-employee" style={{ textDecoration: "none", color: "white" }}>
            Create New Employee
          </Link>
        </Button>
      </div>

      {/* Employee Search and Summary */}
      <div className="row my-3">
        <div className="col-md-6 mb-3">
          <Typography variant="subtitle1" className="fs-3" color="success">
            Total Employees: {employees.length}
          </Typography>
        </div>
        <div className="col-md-6">
          <TextField
            fullWidth
            label="Search by Employee Name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee).map((emp, index) => (
              <tr key={emp.emp_email}>
                <td>{index + 1 + (currentPage - 1) * employeesPerPage}</td>
                <td>{emp.emp_name.toUpperCase()}</td>
                <td>{emp.emp_email.toLowerCase()}</td>
                <td>{emp.emp_mobile}</td>
                <td>{emp.emp_designation.toUpperCase()}</td>
                <td>{emp.emp_gender.toUpperCase()}</td>
                <td>{emp.emp_course.join(", ").toUpperCase()}</td>
                <td>{new Date(emp.created_date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/edit-employee/${emp.emp_email}`}>
                    <Button variant="contained" color="secondary" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        <div className="d-flex justify-content-center my-3">
          <Pagination
            count={Math.ceil(filteredEmployees.length / employeesPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
