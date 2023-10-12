import React from "react";
import "../utils/ShimmerCard.css";

const ShimmerCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 m-4 w-64 h-64 relative overflow-hidden">
      <div className="grayish-effect"></div>
      {/* Content goes here */}
    </div>
  );
};

export default ShimmerCard;
