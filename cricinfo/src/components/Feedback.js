import React, { useState } from "react";
import { toast } from "react-toastify";
import { getDatabase, ref, push } from "firebase/database";
import ThemeContext from "../utils/ThemeContext";
import { useContext } from "react";

const Feedback = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleSendFeedback = () => {
    const uniqueKeyword = localStorage.getItem("unique");
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill out both subject and message fields");
      return;
    }

    const database = getDatabase();
    const userRef = ref(database, `users/${uniqueKeyword}/feedback`);
    push(userRef, {
      subject: subject,
      message: message,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        toast.success("Feedback sent successfully");
        setSubject("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
        toast.error("An error occurred while sending feedback");
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-${
        theme ? "black" : "white"
      }`}
    >
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Feedback</h2>
        <div className="mb-4">
          <label htmlFor="subject" className="block font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-purple-600 focus:border-purple-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-purple-600 focus:border-purple-600 resize-none"
            rows="5"
          ></textarea>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSendFeedback}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Feedback;
