import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import brand from "./brand.jfif";

function Sign() {
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
    onSubmit: (values, { resetForm }) => {
      localStorage.setItem("userEmail", values.email);
      localStorage.setItem("userPassword", values.password);
      resetForm();
      setShowSuccessMessage(true);
    },
  });

  const handleFieldClick = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div id="signbody">
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
          <h2>Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <h3>Email</h3>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={handleFieldClick}
              className={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onClick={handleFieldClick}
              className={
                formik.touched.password && formik.errors.password ? "error" : ""
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
            <button type="submit">Sign up</button>
          </form>
          {showSuccessMessage && (
            <div className="success-message">Successfully sign up</div>
          )}
          <Link to="/login">
            <h4>Log in</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sign;
