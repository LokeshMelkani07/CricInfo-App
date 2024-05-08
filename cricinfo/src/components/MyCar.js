import React, { useContext, useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import ThemeContext from "../utils/ThemeContext";
import PermissionModal from "./PermissionModal";
import { db } from "../utils/firebase";
import { storage } from "../utils/firebase";
import HistoryTable from "./HistoryTable";

const UserProfile = () => {
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState({});
  const [userImage, setUserImage] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  // const [historyData, setHistoryData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    // Fetch the unique keyword from LocalStorage
    console.log("Inside here");
    const uniqueKeyword = localStorage.getItem("unique");
    console.log("unique key ", uniqueKeyword);

    if (uniqueKeyword) {
      // Initialize Firebase database and storage
      const db = getDatabase();
      const storage = getStorage();

      // Reference to the user's data in the Firebase database
      const userRef = ref(db, `users/${uniqueKeyword}`);
      console.log("Userref ", userRef);

      // Fetch user data from the database
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // User data found
            const userData = snapshot.val();
            setUserData(userData);
            // console.log("userrrrrrrrrrr", userData.rfidUid);

            if (userData.displayPicture) {
              // If a display picture URL is available, fetch the image
              const storageImageRef = storageRef(
                storage,
                userData.displayPicture
              );

              getDownloadURL(storageImageRef)
                .then((downloadURL) => {
                  setUserImage(downloadURL);
                })
                .catch((error) => {
                  console.error("Error fetching user image:", error);
                });
            }
          } else {
            console.log("User data not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleGeneratePermission = () => {
    console.log(showPermissionModal);
    setShowPermissionModal(true);
  };

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  const showHistoryTable = () => {
    setShowTable(!showTable);
  };

  if (!localStorage.getItem("unique")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400 text-white">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">
            <span className="text-3xl">407</span> <br />{" "}
            <span className="text-black">Authentication Required</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-600 text-black">
      <div
        className={`p-4 rounded shadow-md ${
          theme === false ? "bg-white text-black-700" : "bg-black text-white"
        }`}
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-4">
          User Profile
        </h1>
        <div className="mb-4">
          {userImage && (
            <img
              src={userImage}
              alt="User Display Picture"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Name:</span> {userData?.name}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Email:</span> {userData?.email}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">DL Number:</span>{" "}
            {userData?.dlNumber}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">RFID UID:</span> {userData?.rfidUid}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <button
            className={`bg-purple-600 hover:bg-purple-700 font-bold py-2 px-2 rounded mb-2 md:mb-0 md:mr-2 focus:outline-none focus:shadow-outline mt-2 ${
              theme === false ? "text-white" : "text-black"
            }`}
            onClick={handleGeneratePermission}
          >
            Generate Permission
          </button>
          <button
            onClick={showHistoryTable}
            className={`bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 mt-0 rounded focus:outline-none focus:shadow-outline ${
              theme === false ? "text-white" : "text-black"
            }`}
          >
            {showTable ? "Hide History" : "Check History"}
          </button>
        </div>
      </div>
      {showPermissionModal && (
        <PermissionModal
          setShowPermissionModal={setShowPermissionModal}
          updateUserData={updateUserData}
          userData={userData}
        />
      )}
      {showTable && <HistoryTable setShowTable={setShowTable} />}
    </div>
  );
};

export default UserProfile;
