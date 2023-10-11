import React from "react";

const Blogs = ({ theme }) => {
  return (
    <div
      className={`p-4 bg-black ${
        theme == "white"
          ? "bg-white-300 text-black-700"
          : "bg-black-300 text-white-700"
      }`}
    >
      Blogs
    </div>
  );
};

export default Blogs;
