import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThemeContext from "../utils/ThemeContext";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("First Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = await userCredential.user;
      // Update the user's profile with additional information (e.g., name)
      await updateProfile(user, {
        displayName: values.name,
      });
      console.log("User signed in successfully!", user);
      // console.log("User token!", user.accessToken);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("unique", user.displayName);
      toast.success("Logged In, Successfully!");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      toast.error(`${errorCode}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        <Form
          className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 ${
            theme === false ? "bg-white text-black-700" : "bg-black"
          }`}
        >
          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="name"
            >
              Enter Your First Name
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="text"
              id="name"
              name="name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="email"
              id="email"
              name="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-6">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="password"
            >
              Password
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="password"
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-6 text-center">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </div>
          <div className="text-center">
            <Link to="/signup" className="text-purple-600 hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
