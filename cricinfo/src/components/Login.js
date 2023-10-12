import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThemeContext from "../utils/ThemeContext";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("User signed in successfully!");
      // You can redirect to another page or take additional actions here
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <Formik
        initialValues={{
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
              htmlFor="email"
            >
              Email
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
