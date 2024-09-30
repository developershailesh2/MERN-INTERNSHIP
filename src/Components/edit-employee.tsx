import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EmpContract } from "../Contracts/emp_contract";
import axios from "axios";
import { response } from "express";

export function EditEmployee() {
  const [employee, setEmployee] = useState<EmpContract[]>([
    {
      emp_email: "",
      emp_name: "",
      emp_mobile: "",
      emp_designation: "",
      emp_gender: "",
      emp_course: [], // Empty array for string array
      created_date: "",
      emp_file: null,
      userId: "",
    },
  ]);

  const [cookies, setCookies, removeCookies] = useCookies(["emp_email"]);

  let navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5252/get-employee/${params.emp_email}`)
      .then((response) => {
        setEmployee(response.data);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      emp_email: employee[0].emp_email,
      emp_name: employee[0].emp_name,
      emp_mobile: employee[0].emp_mobile,
      emp_designation: employee[0].emp_designation,
      emp_gender: employee[0].emp_gender,
      emp_course: employee[0].emp_course,
      userId: cookies["emp_email"],
    },
    onSubmit: (user) => {
      axios
        .put(`http://127.0.0.1:5252/edit-employee/${params.emp_email}`, user)
        .then(() => {
          alert(`Employee Edited...`);
          navigate("/admin-dashboard");
        });
    },
    enableReinitialize: true,
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
                            onChange={formik.handleChange}
                            value="MCA"
                            checked={formik.values.emp_course.includes("MCA")}
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
                            onChange={formik.handleChange}
                            value="BCA"
                            checked={formik.values.emp_course.includes("BCA")}
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
                            onChange={formik.handleChange}
                            value="BSc"
                            checked={formik.values.emp_course.includes("BSc")}
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

                {/* File Upload */}
                {/* <div className="row mb-3">
                                    <div className="col-md-12">
                                        <input
                                            type="file"
                                            name="emp_file"
                                            onChange={(e) => formik.setFieldValue("emp_file", e.target.files?.[0])}
                                            accept=".jpg,.jpeg,.png"
                                            className="form-control"
                                        />
                                    </div>
                                </div> */}

                {/* Buttons */}
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
