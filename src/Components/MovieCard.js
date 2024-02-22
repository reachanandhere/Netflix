import React from "react";
import { IMG_CDN } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return;
  return (
    <div className="w-48 p-2">
      <img alt="Movie card" src={IMG_CDN + posterPath}></img>
    </div>
  );
};

export default MovieCard;
