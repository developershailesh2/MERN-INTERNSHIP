import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./add-employee.css";
import { EmpContract } from "../Contracts/emp_contract";
import { useCookies } from "react-cookie";

let empIdCounter = 1; // Simple counter for generating emp_id

const generateEmpId = () => {
  return empIdCounter++;
};

export function AddNewEmployee() {
  const [cookies, setCookies, removeCookies] = useCookies(["admin_email"]);

  const validationSchema = Yup.object({
    emp_name: Yup.string()
      .required("Name required")
      .min(2, "Name must be 2 or more characters"),
    emp_email: Yup.string().required("Email required").email("Invalid Email"),
    emp_mobile: Yup.string()
      .required("Mobile Number required")
      .min(10, "Mobile number must be 10 digit")
      .max(10)
      .matches(/\d{10}/),
    emp_designation: Yup.string()
      .oneOf(["hr", "manager", "sales"], "Select designation")
      .required("Select Designation"),
    emp_gender: Yup.string().required("Select Gender"),
    emp_course: Yup.array()
      .required("Select Course")
      .min(1, "Select at least 1 Course"),
  });

  let navigate = useNavigate();
  const formik = useFormik<EmpContract>({
    initialValues: {
      emp_name: "",
      emp_email: "",
      emp_mobile: "",
      emp_designation: "",
      emp_gender: "",
      emp_course: [],
      created_date: new Date().toISOString(),
      userId: cookies["admin_email"],
    },
    validationSchema,
    onSubmit: (emp_data) => {
      axios
        .post(`http://127.0.0.1:5252/add-employee`, emp_data)
        .then(() => {
          alert(`Employee Registered Successfully...`);
          navigate("/admin-dashboard");
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            alert("Email already exists");
          }
        });
    },
  });

  return (
    <div className="d-flex justify-content-center container-fluid mt-3">
      <div className="row w-50">
        <div className="d-flex justify-content-center">
          <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            className="form-control bg-light text-warning text-start m-3 p-4"
          >
            <div className="h5 bg-dark text-white p-2 text-center rounded">
              Add New Employee
            </div>
            <dl>
              <dd>
                <TextField
                  onChange={(e) => {
                    formik.setFieldValue(
                      "emp_name",
                      e.target.value.toUpperCase()
                    );
                  }}
                  value={formik.values.emp_name}
                  variant="outlined"
                  label="Employee Name"
                  type="text"
                  name="emp_name"
                  className="form-control mt-2"
                />
              </dd>
              <dd className="text-danger">{formik.errors.emp_name}</dd>

              <dd>
                <TextField
                  onChange={formik.handleChange}
                  variant="outlined"
                  label="Enter Email"
                  type="email"
                  name="emp_email"
                  className="form-control mt-2"
                />
              </dd>
              <dd className="text-danger">{formik.errors.emp_email}</dd>

              <dd>
                <TextField
                  onChange={formik.handleChange}
                  variant="outlined"
                  label="Enter Mobile Number"
                  type="number"
                  name="emp_mobile"
                  className="form-control mt-2"
                />
              </dd>
              <dd className="text-danger">{formik.errors.emp_mobile}</dd>

              <dd>
                <select
                  value={formik.values.emp_designation}
                  name="emp_designation"
                  onChange={formik.handleChange}
                  className="form-control bg-light mt-3 text-center"
                >
                  <option value="select">Select Designation</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
              </dd>
              <dd className="text-danger">{formik.errors.emp_designation}</dd>

              <legend className="text-center">Select Gender</legend>
              <dd className="text-center">
                <fieldset className="form-group">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      value="male"
                      onChange={formik.handleChange}
                      name="emp_gender"
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
                      onChange={formik.handleChange}
                      name="emp_gender"
                      id="female"
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </fieldset>
              </dd>
              <dd className="text-danger">{formik.errors.emp_gender}</dd>

              <legend className="text-center">Select Course</legend>
              <dd className="text-center">
                <div className="d-flex justify-content-center flex-wrap">
                  <div className="form-check m-2">
                    <input
                      type="checkbox"
                      name="emp_course"
                      value="mca"
                      id="mca"
                      className="form-check-input"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const { value, checked } = event.target;
                        let courses = [...formik.values.emp_course];
                        if (checked) {
                          courses.push(value);
                        } else {
                          courses = courses.filter((course) => course !== value);
                        }
                        formik.setFieldValue("emp_course", courses);
                      }}
                    />
                    <label className="form-check-label fs-4" htmlFor="mca">
                      MCA
                    </label>
                  </div>
                  <div className="form-check m-2">
                    <input
                      type="checkbox"
                      name="emp_course"
                      value="bca"
                      id="bca"
                      className="form-check-input"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const { value, checked } = event.target;
                        let courses = [...formik.values.emp_course];
                        if (checked) {
                          courses.push(value);
                        } else {
                          courses = courses.filter((course) => course !== value);
                        }
                        formik.setFieldValue("emp_course", courses);
                      }}
                    />
                    <label className="form-check-label fs-4" htmlFor="bca">
                      BCA
                    </label>
                  </div>
                  <div className="form-check m-2">
                    <input
                      type="checkbox"
                      name="emp_course"
                      value="bsc"
                      id="bsc"
                      className="form-check-input"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const { value, checked } = event.target;
                        let courses = [...formik.values.emp_course];
                        if (checked) {
                          courses.push(value);
                        } else {
                          courses = courses.filter((course) => course !== value);
                        }
                        formik.setFieldValue("emp_course", courses);
                      }}
                    />
                    <label className="form-check-label fs-4" htmlFor="bsc">
                      BSc
                    </label>
                  </div>
                </div>
              </dd>
              <dd className="text-danger">{formik.errors.emp_course}</dd>

            </dl>
            <div className="text-center">
              <Button
                type="submit"
                className="form-control"
                variant="contained"
                color="success"
              >
                Submit
              </Button>
            </div>
            <div className="text-center mt-3">
              <Button
                className="form-control"
                variant="outlined"
                color="success"
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/admin-dashboard"
                >
                  Back
                </Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
