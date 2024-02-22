import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import useFetchPopularMovies from "../customHooks/useFetchPopularMovies";
import useFetchTopRatedMovies from "../customHooks/useFetchTopRatedMovies";
import useFetchUpcomingMovies from "../customHooks/useFetchUpcomingMovies";

const SecondaryContainer = () => {
  useFetchPopularMovies();
  useFetchTopRatedMovies();
  useFetchUpcomingMovies();

  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black ">
      <div className="-mt-48 relative z-10 pl-8">     
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
      <MovieList title={"Popular"} movies={movies?.popularMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
