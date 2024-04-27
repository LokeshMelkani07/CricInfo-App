import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../utils/ThemeContext";
import Cards from "./Cards";
import ShimmerCard from "./Shimmer";
import NoContentMessage from "./NoContentMessage";

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch(
      `https://newsapi.org/v2/everything?q=road%20accidents%20road%20safety&sortBy=publishedAt&apiKey=${apiKey}&pageSize=50&page=1`
    );
    const res = await data.json();
    setArticles(res.articles);
    // console.log("articles ", res.articles);
    setFilteredArticles(res.articles);
    // console.log("filter articles ", filteredArticles);
    setIsLoading(false);
  };

  function filterData(articles, text) {
    const filteredData = articles.filter((article) =>
      article?.title?.toLowerCase()?.includes(text?.toLowerCase())
    );

    return filteredData;
  }

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`container mt-2 mb-2 w-full ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      }`}
    >
      {isLoading == true ? (
        <div className="flex flex-row flex-wrap">
          {Array(10)
            .fill("")
            .map(() => (
              <ShimmerCard />
            ))}
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-extrabold mb-4 mx-4 text-purple-600 py-4">
            Latest News
          </h1>
          <div className="flex flex-col md:flex-row items-center md:items-start mb-4 mx-4">
            <input
              type="text"
              name="search"
              className={`border-2 border-purple-600 rounded-full py-2 px-4 w-full md:w-2/3 lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                theme === false
                  ? "bg-white text-black-700"
                  : "bg-black text-white"
              }`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search news..."
            />
            <button
              className=" md:mt-0 md:ml-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
              onClick={() => {
                const data = filterData(articles, searchText);
                setFilteredArticles(data);
                setSearchText("");
              }}
            >
              Search
            </button>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="flex items-center justify-center min-h-screen">
              <h1>
                The Data cannot be shown because the API does has CORD policy
                which does not allows data to be fetched from sources other than
                localhost
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles?.map((article, index) => (
                <Cards key={index} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
