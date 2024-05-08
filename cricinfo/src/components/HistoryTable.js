import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
import { get, getDatabase, ref } from "firebase/database";

const HistoryTable = ({ setShowTable }) => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const uniqueKeyword = localStorage.getItem("unique");
    if (uniqueKeyword) {
      const db = getDatabase();
      const userRef = ref(db, `users/${uniqueKeyword}/history`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const historyUserData = snapshot.val();
            setData(Array.from(historyUserData));
          } else {
            console.log("User data not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleModalOnce = () => {
    setShowTable(false);
  };

  return (
    <div className={`max-w-xl mx-auto mt-10 mb-10 relative`}>
      <div className="absolute top-0 right-0 p-2">
        <button
          onClick={handleModalOnce}
          className="text-gray-400 hover:text-gray-800"
        >
          &#10006;
        </button>
      </div>
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className={`w-full border-collapse border border-gray-800`}>
            <thead>
              <tr className="bg-gray-200">
                <th className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                  S.No
                </th>
                <th className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                  Permission Type
                </th>
                <th className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                  RFID
                </th>
                <th className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                  Date
                </th>
                <th className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                    {index + 1}
                  </td>
                  <td className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                    {item.permission}
                  </td>
                  <td className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                    {item.rfid}
                  </td>
                  <td className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                    {item.date}
                  </td>
                  <td className={`border px-2 py-1 text-sm md:px-4 md:py-2`}>
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.length === 0 && (
        <p className="text-center mt-4">No data to display</p>
      )}
    </div>
  );
};

export default HistoryTable;
