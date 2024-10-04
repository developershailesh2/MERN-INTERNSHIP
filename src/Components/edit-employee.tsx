import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EmpContract } from "../Contracts/emp_contract";

export function EditEmployee() {
  
  const [cookies, setCookies, removeCookies] = useCookies(["emp_email"]);
  const [employee, setEmployee] = useState<EmpContract>({
    emp_name: "",
    emp_email: cookies["emp_email"],
    emp_mobile: "",
    emp_designation: "",
    emp_gender: "",
    emp_course: [], // Empty array for string array
    created_date: "",
   userId: "",
  });

  

  let navigate = useNavigate();
  let params = useParams();

  // Fetch employee data on component mount
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/get-employee/${cookies["emp_email"]}`)
      .then((response) => {
        console.log(response.data);
        setEmployee(response.data); // Update the state with the fetched employee data
      })
      .catch((error) => {
        console.error("Error fetching employee data: ", error);
      });
  }, []);

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      
      emp_name: employee.emp_name || "",
      emp_email: cookies["emp_email"] ,
      emp_mobile: employee.emp_mobile || "",
      emp_designation: employee.emp_designation || "",
      emp_gender: employee.emp_gender || "",
      emp_course: employee.emp_course || [],
    },
    
    onSubmit: (updatedEmployee) => {
      axios
        .put(`http://127.0.0.1:5252/edit-employee/${params["emp_email"]}`, updatedEmployee)
        .then(() => {
          console.log(updatedEmployee);
          alert("Employee Details Edited...");
          navigate("/admin-dashboard");
        })
        .catch((error) => {
          console.error("Error updating employee: ", error);
        });
    },
    enableReinitialize: true, // Reinitialize form with updated employee data
  });

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Edit Employee</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit} className="p-3">
                {/* First Row: Name and Email */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      name="emp_name"
                      onChange={formik.handleChange}
                      value={formik.values.emp_name}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      name="emp_email"
                      onChange={formik.handleChange}
                      value={formik.values.emp_email}
                      disabled // Email should not be editable
                    />
                  </div>
                </div>

                {/* Second Row: Mobile Number and Designation */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      type="number"
                      variant="outlined"
                      name="emp_mobile"
                      onChange={formik.handleChange}
                      value={formik.values.emp_mobile}
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      name="emp_designation"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.emp_designation}
                    >
                      <option value="select">Select Designation</option>
                      <option value="hr">HR</option>
                      <option value="manager">Manager</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>
                </div>

                {/* Third Row: Gender and Courses */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <legend className="fs-6">Gender</legend>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          value="male"
                          name="emp_gender"
                          onChange={formik.handleChange}
                          checked={formik.values.emp_gender === "male"}
                          id="male"
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          type="radio"
                          value="female"
                          name="emp_gender"
                          onChange={formik.handleChange}
                          checked={formik.values.emp_gender === "female"}
                          id="female"
                          className="form-check-input"
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </fieldset>
                  </div>

                  {/* Courses Checkboxes */}
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <legend className="fs-6">Courses</legend>
                      <div className="d-flex justify-content-around">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            name="emp_course"
                            value="MCA"
    checked={formik.values.emp_course.includes("MCA")} // Correct: Check if array includes this value
    onChange={(e) => {
      if (e.target.checked) {
        formik.setFieldValue("emp_course", [...formik.values.emp_course, e.target.value]);
      } else {
        formik.setFieldValue("emp_course", formik.values.emp_course.filter((course) => course !== e.target.value));
      }
    }}
                            id="mca"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="mca">
                            MCA
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            name="emp_course"
                            value="BCA"
    checked={formik.values.emp_course.includes("BCA")} // Correct: Check if array includes this value
    onChange={(e) => {
      if (e.target.checked) {
        formik.setFieldValue("emp_course", [...formik.values.emp_course, e.target.value]);
      } else {
        formik.setFieldValue("emp_course", formik.values.emp_course.filter((course) => course !== e.target.value));
      }
    }}
                            id="bca"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="bca">
                            BCA
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            name="emp_course"
                            value="BCA"
    checked={formik.values.emp_course.includes("BSc")} // Correct: Check if array includes this value
    onChange={(e) => {
      if (e.target.checked) {
        formik.setFieldValue("emp_course", [...formik.values.emp_course, e.target.value]);
      } else {
        formik.setFieldValue("emp_course", formik.values.emp_course.filter((course) => course !== e.target.value));
      }
    }}
                            id="bsc"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="bsc">
                            BSc
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>

                {/* Submit and Back Buttons */}
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="me-2 fs-5"
                  >
                    Update
                  </Button>
                  <Link to="/admin-dashboard">
                    <Button
                      className="fs-5"
                      variant="contained"
                      color="warning"
                    >
                      Back
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
