import React, { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Cards = ({ article }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`rounded-lg border shadow-md p-4 m-4 ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      }  ${theme === false ? "border-none" : "border-white"} `}
    >
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-auto mb-4"
      />
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="text-gray-500 mb-2">{article.publishedAt}</p>
      <p className="text-gray-700">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-2 block"
      >
        Read more
      </a>
    </div>
  );
};

export default Cards;
