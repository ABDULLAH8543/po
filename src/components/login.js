import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import brand from './brand.jfif';

function Login() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      const storedUserEmail = localStorage.getItem("userEmail");
      const storedUserPassword = localStorage.getItem("userPassword");

      if (values.email === storedUserEmail && values.password === storedUserPassword) {
        setSubmitting(false);
        setStatus("Successfully logged in");
        setShowSuccessMessage(true);
        formik.resetForm();
      } else {
        setStatus("Wrong email or password");
      }
    },
  });

  const handleFieldClick = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div id="signbody">
      <div>
        <div id="head">
          <Link to="/">
            <h1>shopping time</h1>
          </Link>
        </div>
        <div id="form">
          <div id="brand">
            <img src={brand} alt="Brand Logo" />
          </div>
          <div id="forminner">
            <h2>Log in</h2>
            <form onSubmit={formik.handleSubmit}>
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={handleFieldClick}
                className={formik.touched.email && formik.errors.email ? "error" : ""}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onClick={handleFieldClick}
                className={formik.touched.password && formik.errors.password ? "error" : ""}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
              <button type="submit">Log in</button>
            </form>
            <Link to="/Sign-up">
              <h4>Sign-up</h4>
            </Link>
            {showSuccessMessage && (
              <p className="success-message">Successfully logged in</p>
            )}
            {formik.status && (
              <p className={formik.status === "Successfully logged in" ? "success-message" : "error-message"}>
                {formik.status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
