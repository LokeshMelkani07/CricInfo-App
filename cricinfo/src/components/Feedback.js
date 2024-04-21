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
    // const newFeedbackRef = push(userRef);
    push(userRef, {
      subject: subject,
      message: message,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        toast.success("Feedback sent successfully");
        // Clear input fields after successful send
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
      className={` p-6 rounded-lg shadow-md w-80 ml-auto mr-auto mt-2 mb-2 ${
        theme === false ? "bg-slate-50 text-black-700" : "bg-black text-white"
      }`}
    >
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
          className="block w-full rounded-md px-2 py-2 text-black"
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
          className="block w-full border-gray-300 text-black rounded-md px-2 py-2"
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
  );
};

export default Feedback;
