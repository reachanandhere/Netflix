import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies, addTopRatedMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(store=>store.movies.topRatedMovies)

  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
   if(!topRatedMovies) getTopRatedMovies();
  }, []);
};

export default useFetchTopRatedMovies;
