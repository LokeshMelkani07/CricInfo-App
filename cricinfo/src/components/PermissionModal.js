import React, { useState } from "react";
import { toast } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";
import { push, get } from "firebase/database";

const PermissionModal = ({
  setShowPermissionModal,
  updateUserData,
  userData,
}) => {
  const [visible, setVisible] = useState(true);
  const [permissionType, setPermissionType] = useState("permanent");
  const [newRFID, setNewRFID] = useState("");
  const [timeRange, setTimeRange] = useState("20000");

  const handleModal = async () => {
    // console.log("Permission Type:", permissionType);
    // console.log("New RFID:", newRFID);
    // console.log("Time Range:", timeRange);
    const rfid = localStorage.getItem("old_rfid");
    const uniqueKeyword = localStorage.getItem("unique");
    const database = getDatabase();
    // Get the previous data in history from db
    const historyRef = ref(database, `users/${uniqueKeyword}/history`);
    const historySnapshot = await get(historyRef);
    if (historySnapshot.val()) {
      // console.log("hsssss ", historySnapshot.val());
      let existingHistory = Array.from(historySnapshot.val()) || []; // Initialize as empty array if no data found
      // Now append new data into previous one
      const newPermission = {
        permission: permissionType,
        rfid: newRFID,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      existingHistory.push(newPermission);
      // Now we do not need this setHistoryData component below as we are now directly calling the database and getting the history data and showing up
      // setHistoryData(existingHistory);
      // and push the old + new data as whole inside db
      await set(
        ref(database, `users/${uniqueKeyword}/history`),
        existingHistory
      );
    } else {
      await set(ref(database, `users/${uniqueKeyword}/history`), {
        permission: permissionType,
        rfid: newRFID,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }
    if (permissionType === "permanent") {
      toast.success(`Permission Granted to RFID ${newRFID}`);
      await set(ref(database, `users/${uniqueKeyword}/rfidUid`), newRFID);
      localStorage.setItem("old_rfid", newRFID);
    } else {
      // const timeInMillis = getTimeInMillis(timeRange);
      setTimeout(async () => {
        // await set(ref(database, `users/${uniqueKeyword}/rfidUid`), newRFID);

        // console.log("time  vvdf", timeRange);
        toast.info(
          `Temporary access for RFID ${newRFID} expired. Reverted to original RFID.`
        );
        const updatedUserData = { ...userData, rfidUid: rfid };
        await set(ref(database, `users/${uniqueKeyword}/rfidUid`), rfid);
        updateUserData(updatedUserData);
      }, timeRange);
      toast.success(`Permission Granted to RFID ${newRFID}`);
      // await set(ref(database, `users/${uniqueKeyword}/rfidUid`), newRFID);
    }
    setShowPermissionModal(false);
    set(ref(database, `users/${uniqueKeyword}/rfidUid`), newRFID);
    const updatedUserData = { ...userData, rfidUid: newRFID };
    updateUserData(updatedUserData);
  };

  const handleModalOnce = () => {
    setShowPermissionModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-lg p-4">
      <div className="modal-container">
        <div className="bg-white border-2 border-purple-600 rounded-lg p-6">
          <button
            onClick={handleModalOnce}
            className="float-right text-gray-400 hover:text-gray-800"
          >
            &#10006;
          </button>
          <h2 className="text-xl font-bold mb-4">Generate Permission</h2>
          <div className="mb-4">
            <label htmlFor="permissionType" className="block font-medium mb-2">
              Type of Permission
            </label>
            <select
              id="permissionType"
              name="permissionType"
              value={permissionType}
              onChange={(e) => setPermissionType(e.target.value)}
              className="block w-full border-gray-300 rounded-md"
            >
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
          {permissionType === "permanent" && (
            <div className="mb-4">
              <label htmlFor="newRFID" className="block font-medium mb-2">
                New RFID
              </label>
              <input
                type="text"
                id="newRFID"
                name="newRFID"
                value={newRFID}
                onChange={(e) => setNewRFID(e.target.value)}
                className="block w-full border-gray-300 rounded-md p-1"
              />
            </div>
          )}
          {permissionType === "temporary" && (
            <div className="mb-4">
              <label htmlFor="newRFID" className="block font-medium mb-2">
                New RFID
              </label>
              <input
                type="text"
                id="newRFID"
                name="newRFID"
                value={newRFID}
                onChange={(e) => setNewRFID(e.target.value)}
                className="block w-full border-gray-300 rounded-md p-1"
              />
              <label htmlFor="timeRange" className="block font-medium mb-2">
                Time Range
              </label>
              <select
                id="timeRange"
                name="timeRange"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block w-full border-gray-300 rounded-md"
              >
                <option value="20000">20 seconds</option>
                <option value="50000">50 seconds</option>
              </select>
            </div>
          )}
          <button
            onClick={handleModal}
            className="bg-blue-950 text-white hover:bg-blue-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Grant Permission
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
