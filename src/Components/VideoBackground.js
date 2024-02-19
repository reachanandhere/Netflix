import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const VideoBackground = ({ movieId }) => {
    const [trailerKey, setTrailerKey] = useState(null)
  const getMovieVideos = async (movieId) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      API_OPTIONS
    );
    const json = await data.json();
    const trailerData = json.results.filter((v) => v.type == "Trailer");
    const trailer = trailerData.length ? trailerData[0] : json.results[0];
    setTrailerKey(trailer?.key)
  };

  useEffect(() => {
    getMovieVideos(movieId);
  }, []);
  return (
    <div className="w-screen">
      <iframe
        className="w-screen h-screen aspect-video"
       

        src={"https://www.youtube.com/embed/"+trailerKey+"?&autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=0"}
        title="YouTube video player"
        
        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        
      ></iframe>
    </div>
  );
};

export default VideoBackground;
