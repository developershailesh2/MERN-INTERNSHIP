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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  let navigate = useNavigate();

  // Fetch admin user data once when the component mounts
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/all-employee/${cookies["admin_email"]}`)
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
      });
  }, [cookies]);

  function handleSignOut(): void {
    removeCookies("admin_email");
    navigate("/admin-login", { replace: true });
    window.location.reload();
  }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.emp_name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <div className="container-fluid">
      <nav className="d-flex flex-wrap justify-content-between align-items-center bg-light text-dark p-3">
        <span className="fs-5 text-bg-danger fw-bold m-3 p-2 rounded">
          Welcome, {cookies["admin_email"] ? cookies["admin_email"] : "Admin"}
        </span>
        <Button
          onClick={handleSignOut}
          variant="contained"
          color="error"
          className="d-flex align-items-center p-3 fw-bold"
        >
          <span className="me-2">Log Out</span>
          <LockIcon />
        </Button>
      </nav>

      <div className="d-flex mt-4 justify-content-start">
        <Button variant="contained" color="info" className="m-2 fw-bold fs-5">
          <Link
            to="/add-employee"
            style={{ textDecoration: "none", color: "white" }}
          >
            Create New Employee
          </Link>
        </Button>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 ">
            <div className="m-3 p-3">
              <div className="d-flex justify-content-evenly">
                <Typography variant="overline" className="fs-5" color="warning">
                  Total Number of Employees: {employees.length}
                </Typography>

                <TextField
                  label="Search by Employee Name"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mb-3 w-50"
                />
              </div>

              {filteredEmployees.length > 0 ? (
                <>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sr. No.</th> {/* New ID Column */}
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Created Date</th>
                        {/* <th>Image</th> New column for image */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees
                        .slice(indexOfFirstEmployee, indexOfLastEmployee)
                        ?.map((emp, index) => (
                          <tr key={emp.userId}>
                            <td>
                              {index + 1 + (currentPage - 1) * employeesPerPage}
                            </td>
                            <td>{emp.emp_name.toUpperCase()}</td>
                            <td>{emp.emp_email.toLowerCase()}</td>
                            <td>{emp.emp_mobile}</td>
                            <td>{emp.emp_designation.toUpperCase()}</td>
                            <td>{emp.emp_gender.toUpperCase()}</td>
                            <td>{emp.emp_course.join(" , ").toUpperCase()}</td>
                            <td>
                              {new Date(emp.created_date).toLocaleDateString()}
                            </td>
                            {/* <td>
                              <img
                                src={`data:image/jpeg;base64,${emp.image}`}
                                alt="Employee"
                                style={{ width: '100px', height: '100px' }}
                              />
                            </td> Image rendering */}
                            <td>
                              <Link to="/edit-employee">
                                <Button
                                  className="me-3"
                                  variant="contained"
                                  color="secondary"
                                >
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

                  <div className="d-flex justify-content-center mb-3">
                    <Pagination
                      count={Math.ceil(
                        filteredEmployees.length / employeesPerPage
                      )}
                      page={currentPage}
                      onChange={handleChangePage}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                    />
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h5>
                    No Employees Found with the name "{searchTerm}". Please try
                    a different name.
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
