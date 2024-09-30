import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function AdminRegister() {
  const validationSchema = Yup.object({
    admin_name: Yup.string()
      .transform((value) => value.toUpperCase())
      .min(2, "Name should be 2 Characters")
      .required("Name required"),
    admin_email: Yup.string()
      .required("Email required")
      .email("Invalid Email format"),
    admin_password: Yup.string()
      .required("Password required")
      .min(6, "Password Must be at least 6 Characters"),
  });

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      admin_name: "",
      admin_email: "",
      admin_password: "",
    },
    validationSchema,
    onSubmit: (user) => {
      axios
        .post(`http://127.0.0.1:5252/register-admin`, user)
        .then(() => {
          alert(`Admin Registration Successfull...`);
          navigate("/admin-login");
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            alert(`Email Alredy registered. Please use Different Email`);
          } else {
            alert(`Email already verified `);
          }
        });
    },
  });

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center container-fluid"
    >
      <div className="d-flex text-start">
        <form
          onSubmit={formik.handleSubmit}
          className="form-control bg-light m-3 p-4"
        >
          <h3 className="m-4">ADMIN REGISTRATION</h3>
          <dl>
            <dd>
              <TextField
                onChange={(e) => {
                  formik.setFieldValue(
                    "admin_name",
                    e.target.value.toUpperCase()
                  );
                }}
                value={formik.values.admin_name}
                variant="outlined"
                label="Enter Name"
                required
                type="text"
                name="admin_name"
                className="form-control mb-2"
              />
            </dd>
            <dd className="text-danger">{formik.errors.admin_name}</dd>

            <dd>
              <TextField
                onChange={formik.handleChange}
                variant="outlined"
                label="Enter Email"
                required
                type="email"
                name="admin_email"
                className="form-control mb-2"
              />
            </dd>
            <dd className="text-danger">{formik.errors.admin_email}</dd>

            <dd>
              <TextField
                onChange={formik.handleChange}
                label="Enter Password"
                required
                type="password"
                name="admin_password"
                className="form-control"
              />
            </dd>
            <dd className="text-danger">{formik.errors.admin_password}</dd>
            <Button
              variant="contained"
              color="success"
              type="submit"
              className="form-control mb-3 mt-3 "
            >
              Register
            </Button>
          </dl>

          <Button
            className="form-control mb-3"
            variant="contained"
            color="secondary"
          >
            <Link
              to="/admin-login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Already Have Account
            </Link>
          </Button>
          <Button
            variant="contained"
            className="form-control"
            color="secondary"
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Button>
        </form>
      </div>
    </div>
  );
}
