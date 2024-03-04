import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchPopularMovies = () => {
  const dispatch = useDispatch();

  const popularMovies=useSelector(store=>store?.movies?.popularMovies)

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=2",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
   if(!popularMovies) getPopularMovies();
  }, []);
};

export default useFetchPopularMovies;
