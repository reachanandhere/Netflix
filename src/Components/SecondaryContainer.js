import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black ">
      <div className="-mt-48 relative z-10 pl-8">     
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies?.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
