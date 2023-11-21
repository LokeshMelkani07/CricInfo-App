import React, { useContext, useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage, setFieldValue } from "formik";
import * as Yup from "yup";
import ThemeContext from "../utils/ThemeContext";
import { auth } from "../utils/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { getDatabase, set } from "firebase/database";
import { ref as sref } from "firebase/database";
import { ref } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
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

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [imageLink, setImageLink] = useState(null);
  const valuesRef = useRef(null); // Define a ref to store values
  const auth = getAuth();

  const handleSignup = async (values) => {
    try {
      console.log("handle signup trigger");
      console.log("values is ", valuesRef.current);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Update the value of DP in values object and send it to db
      // Update the displayPicture field in Formik

      const db = getDatabase();
      set(sref(db, `users/${values.name}`), {
        ...values,
        displayPicture: valuesRef.current.displayPicture,
      });
      localStorage.setItem("old_rfid", values.rfidUid);
      toast.success("Signed Up, Successfully");
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      toast.error(`${errorCode}`);
    }
  };

  const handleImageChange = async (e) => {
    try {
      // Using firebase storage to create a URL for the display image and store it in Firebase Storage
      const storage = getStorage();
      const file = e.target.files[0];

      // ref to where our image will be stored
      const storageRef = ref(storage, `users/image`);

      // Upload the image
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Image uploaded!");

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // After the file is uploaded, set the download URL to the imageLink state or handle it as needed
      setImageLink(downloadURL);

      // Assign values to the ref
      valuesRef.current = {
        ...valuesRef.current,
        displayPicture: downloadURL,
      };
      console.log("valueref is ", valuesRef.current);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-600">
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
          dlNumber: "",
          rfidUid: "",
          checkbox: false,
          displayPicture: "",
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
              htmlFor="displayPicture"
              className="block text-gray-800 text-sm font-bold mb-2"
            >
              Display Picture
            </label>
            <input
              type="file"
              id="displayPicture"
              name="displayPicture"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-gray-800 text-sm font-bold mb-2 ${
                theme === false ? "text-black-700" : "text-white"
              }`}
              htmlFor="name"
            >
              First Name
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
              htmlFor="lastname"
            >
              Last Name
            </label>
            <Field
              className="w-full px-3 py-2 border rounded appearance-none"
              type="text"
              id="lastname"
              name="lastname"
            />
            <ErrorMessage
              name="lastname"
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
          <div className="text-center">
            <Link className="text-purple-600 hover:underline" to="/login">
              Already have an account? Log in
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
