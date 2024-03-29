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

  
  const handleGPTSearch = async () => {

   
    const query =
    "Act as a movie recommendation system for bollywood and hollywood movies and suggest some movies for the query " +
    searchText?.current?.value +
    ". Give me names of 5 Indian movies, comma separated like the example result given ahead. Example Result: Gadar, Don, Murder, Lagaan, Swades. Search for the specific genre, if horror is mentioned, suggest movies like bhool bhulaiya";
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo-0125",
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
    <div className="sm:pt-[40%] pt-[15%] flex justify-center sm:bg-black sm:h-[20%]">
      <form className="w-1/2 sm:w-9/12 bg-black" onSubmit={(e) => e.preventDefault()}>
        <input
          type="test"
          className="p-4 m-4 sm:mx-0 sm:my-8 w-9/12 sm:w-full"
          placeholder={lang[langKey].gptSearchPlacehholder}
          ref={searchText}
        />
        <button
          className="py-2 px-4 h-14 w-2/12 sm:w-full bg-red-600  text-white rounded-lg"
          onClick={handleGPTSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
