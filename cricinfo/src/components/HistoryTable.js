import React from "react";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const HistoryTable = ({ historyData, setShowTable }) => {
  const { theme } = useContext(ThemeContext);
  const handleModalOnce = () => {
    setShowTable(false);
  };

  return (
    <div
      className={`max-w-xl ml-auto mr-auto mt-10 mb-10 fixed inset-0 flex flex-col items-center justify-center z-10 rounded-lg p-4 overflow-scroll ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      } `}
    >
      <div className="flex justify-between">
        <h2
          className={`text-xl font-bold ${
            theme === false ? "bg-white text-black-700" : "bg-black text-white"
          } `}
        >
          Permission History
        </h2>
        <button
          onClick={handleModalOnce}
          className="text-gray-400 hover:text-gray-800"
        >
          &#10006;
        </button>
      </div>
      {historyData.length === 0 ? (
        <p className="text-center">No data to display</p>
      ) : (
        <table
          className={`w-full border-collapse border border-gray-800 overflow-scroll
        ${
          theme === false ? "bg-white text-black-700" : "bg-black text-white"
        } `}
        >
          <thead>
            <tr className="bg-gray-200">
              <th
                className={`border px-4
                py-2 ${
                  theme === false
                    ? "bg-white text-black-700"
                    : "bg-black text-white"
                } `}
              >
                S.No
              </th>
              <th
                className={`border px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
              >
                Permission Type
              </th>
              <th
                className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
              >
                RFID
              </th>
              <th
                className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
              >
                Date
              </th>
              <th
                className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index} className="bg-gray-100">
                <td
                  className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
                >
                  {index + 1}
                </td>
                <td
                  className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
                >
                  {item.permission}
                </td>
                <td
                  className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
                >
                  {item.rfid}
                </td>
                <td
                  className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
                >
                  {item.date}
                </td>
                <td
                  className={`border  px-4 py-2
              ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              } `}
                >
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryTable;