import React, { useContext, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import ThemeContext from "../utils/ThemeContext";
import ShimmerCard from "./Shimmer";

const Videos = () => {
  const { theme } = useContext(ThemeContext);
  const apikey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const query = "road safety awareness video";
  const result = 20;
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apikey}&maxResults=${result}`;

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await fetch(apiUrl);
    const res = await data.json();
    setVideos(res.items);
    setIsLoading(false);
  };

  return isLoading == true ? (
    <div className="flex flex-row flex-wrap">
      {Array(10)
        .fill("")
        .map(() => (
          <ShimmerCard />
        ))}
    </div>
  ) : (
    <div
      className={`flex container mt-2 mb-2 flex-wrap ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      }`}
    >
      <div>
        {videos?.map((ele) => (
          <VideoCard video={ele} />
        ))}
      </div>
    </div>
  );
};

export default Videos;
