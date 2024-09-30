import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export function AdminLogin() {
  const [cookies, setCookies, removeCookies] = useCookies(["admin_email"]);

  const validationSchema = Yup.object({
    admin_email: Yup.string().required("Email Required"),
    admin_password: Yup.string().required("Password Required"),
  });

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      admin_email: "",
      admin_password: "",
    },
    onSubmit: (admin) => {
      axios.get(`http://127.0.0.1:5252/admin-users`).then((response) => {
        var client = response.data.find(
          (item: any) => item.admin_email === admin.admin_email
        );
        if (client) {
          if (client.admin_password === admin.admin_password) {
            setCookies("admin_email", client.admin_email);
            navigate("/admin-dashboard");
          } else {
            alert(`User Id or Password is Incorrect`);
          }
        } else {
          alert(`User Not Found`);
        }
      });
    },
  });

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center container-fluid"
    >
      <div className="d-flex p-3 m-3 ">
        <form
          onSubmit={formik.handleSubmit}
          className="form-control text-start m-3 p-4"
        >
          <div className="h2 p-3">ADMIN LOGIN </div>
          <dl>
            <dd>
              <TextField
                onChange={formik.handleChange}
                helperText="Enter Your Email"
                variant="outlined"
                label="Email"
                type="email"
                name="admin_email"
                className="form-control mb-3"
              />
            </dd>
            <dd>{formik.errors.admin_email}</dd>

            <dd>
              <TextField
                onChange={formik.handleChange}
                helperText="Enter Your Password"
                variant="outlined"
                label="Password"
                type="password"
                name="admin_password"
                className="form-control mb-2"
              />
            </dd>
            <dd>{formik.errors.admin_password}</dd>
          </dl>
          <Button
            variant="contained"
            color="secondary"
            className="form-control"
            type="submit"
            value="Login"
          >
            Login
          </Button>
          <div className="mt-3">
            <Button variant="outlined" color="inherit" className="form-control">
              <Link to="/" style={{ textDecoration: "none" }}>
                Back
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
