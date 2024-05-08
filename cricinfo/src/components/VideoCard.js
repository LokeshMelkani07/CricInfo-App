import React from "react";

const VideoCard = ({ video }) => {
  const { id, snippet } = video;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 md:w-64">
      <div className="mb-4">
        <iframe
          title={snippet.title}
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${id?.videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800">
          {snippet?.title}
        </h3>
        <p className="text-gray-600">{snippet?.description}</p>
        <p className="text-gray-600">Published on {snippet?.publishedAt}</p>
      </div>
    </div>
  );
};

export default VideoCard;
