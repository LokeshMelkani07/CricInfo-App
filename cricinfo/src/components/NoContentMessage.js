import React from "react";

const NoContentMessage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="text-gray-500 text-2xl font-bold mb-4">
        No content to display
      </div>
      <p className="text-gray-400">There are no items to show at the moment.</p>
    </div>
  );
};

export default NoContentMessage;
