import React from "react";
import arrow from '../images/play-arrow.png'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-4/12 sm:w-11/12 h-screen aspect-video pt-80 sm:pt-96 px-16 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="py-6 sm:hidden text-">{overview}</p>

      <div className="flex sm:my-2">
        <button className="bg-gray-200 text-black p-4 w-[8rem] sm:px-8  flex rounded-md text-xl hover:bg-opacity-70 sm:hidden"><img className="w-6 my-1" src={arrow}></img>&nbsp; Play</button>
        <button className="bg-gray-500 text-white p-4 w-[8rem]  mx-4 flex rounded-md text-xl sm:hidden">More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
