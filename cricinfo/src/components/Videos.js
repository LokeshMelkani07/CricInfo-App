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

  return isLoading ? (
    <div className="flex flex-row flex-wrap">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <ShimmerCard key={index} />
        ))}
    </div>
  ) : (
    <div className="container mx-auto mt-2 mb-2">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
          theme === false ? "bg-white text-black-700" : "bg-black text-white"
        }`}
      >
        {videos.map((ele) => (
          <VideoCard key={ele.id.videoId} video={ele} />
        ))}
      </div>
    </div>
  );
};

export default Videos;
