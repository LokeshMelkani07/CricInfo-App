import React, { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Blogs = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`p-4 ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      }`}
    >
      Blogs
    </div>
  );
};

export default Blogs;
