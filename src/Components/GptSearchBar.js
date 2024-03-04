import React, { useRef } from "react";
import lang from "../utils/langaugeConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store?.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const query =
    "Act as a movie recommendation system and suggest some movies for the query " +
    searchText?.current?.value +
    ". Give me names of 5 Indian movies, comma separated like the example result given ahead. Example Result: Gadar, Don, Murder, Lagaan, Swades.";

  const handleGPTSearch = async () => {
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResult.choices) {
    }

    const gptMovies = gptResult.choices[0].message?.content.split(",");
    const movieDataPromise = gptMovies.map((movie) => fetchMovies(movie));
    const movieData = await Promise.all(movieDataPromise);

    dispatch(addGPTMovies({ movieNames: gptMovies, movieResults: movieData }));
  };

  //Search Movie in TMDB
  const fetchMovies = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=hi&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  return (
    <div className="pt-[15%] flex justify-center">
      <form className="w-1/2 bg-black" onSubmit={(e) => e.preventDefault()}>
        <input
          type="test"
          className="p-4 m-4 w-9/12"
          placeholder={lang[langKey].gptSearchPlacehholder}
          ref={searchText}
        />
        <button
          className="py-2 px-4 h-14 w-2/12 bg-red-600  text-white rounded-lg"
          onClick={handleGPTSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
