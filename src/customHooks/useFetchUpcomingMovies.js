import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies, addUpcomingMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = useSelector(store=>store.movies.upcomingMovies)

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    if(!upcomingMovies) getUpcomingMovies();
  }, []);
};

export default useFetchUpcomingMovies;
