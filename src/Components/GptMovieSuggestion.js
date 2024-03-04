import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  return (
    <div>
     { movieNames && <div className="p-4 m-4 bg-black text-white bg-opacity-70">
        {movieNames?.map((movieName, index) => {
          return (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          );
        })}
      </div>}
    </div>
  );
};

export default GptMovieSuggestion;
