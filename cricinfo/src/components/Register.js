import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThemeContext from "../utils/ThemeContext";
import { auth } from "../utils/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  dlNumber: Yup.string().required("DL Number is required"),
  rfidUid: Yup.string().required("RFID UID is required"),
  checkbox: Yup.bool().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const handleSignup = async (values) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ); // Use createUserWithEmailAndPassword function from Firebase SDK
    const user = userCredential.user;
    console.log("User signed up:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error:", errorCode, errorMessage);
  }
};

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const auth = getAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          dlNumber: "",
          rfidUid: "",
          checkbox: false,
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        <Form
          className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit ${
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
              Name
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="dlNumber"
            >
              DL Number
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="text"
              id="dlNumber"
              name="dlNumber"
            />
            <ErrorMessage
              name="dlNumber"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="rfidUid"
            >
              RFID UID Number
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="text"
              id="rfidUid"
              name="rfidUid"
            />
            <ErrorMessage
              name="rfidUid"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="checkbox"
            >
              <Field
                type="checkbox"
                id="checkbox"
                name="checkbox"
                className="mr-2"
              />
              All details are best to my knowledge and correct
            </label>
            <ErrorMessage
              name="checkbox"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div className="mb-6 text-center">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
