import React from "react";

const SmallScreenMessage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-error mb-4">
          Screen Size Too Small
        </h1>
        <p className="text-xl mb-8 text-balance">
          We are sorry, but your screen is too small to display this content
          properly. Please try accessing this page on a larger device for the
          best experience.
        </p>
        <a href="/" className="btn">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default SmallScreenMessage;
