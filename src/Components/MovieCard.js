import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;
  return (
    <div className="w-48 p-2 hover:scale-105 hover:py-0 hover:w-60 py-6">
      <img alt="Movie card" src={IMG_CDN + posterPath}></img>
    </div>
  );
};

export default MovieCard;
