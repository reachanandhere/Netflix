import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";

const useFetchNowPlayingMovies = ()=>{
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store=>store?.movies?.nowPlayingMovies)

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=2",
      API_OPTIONS
    );
    const json = await data.json();
   

    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    if(!nowPlayingMovies) getNowPlayingMovies();
  }, []);
}

export default useFetchNowPlayingMovies