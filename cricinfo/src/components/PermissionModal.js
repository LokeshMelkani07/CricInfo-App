import React, { useState } from "react";

const PermissionModal = ({ setShowPermissionModal }) => {
  const [visible, setVisible] = useState(true);
  const [permissionType, setPermissionType] = useState("permanent");
  const [newRFID, setNewRFID] = useState("");
  const [timeRange, setTimeRange] = useState("5 minutes");

  const handleModal = () => {
    console.log("Permission Type:", permissionType);
    console.log("New RFID:", newRFID);
    console.log("Time Range:", timeRange);
    setShowPermissionModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 rounded-lg p-4">
      <div className="modal-container">
        <div className="bg-white border-2 border-purple-600 rounded-lg p-6">
          <button
            onClick={handleModal}
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
                className="block w-full border-gray-300 rounded-md"
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
                className="block w-full border-gray-300 rounded-md"
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
                <option value="5 minutes">5 minutes</option>
                <option value="10 minutes">10 minutes</option>
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
