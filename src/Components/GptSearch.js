import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute sm:hidden -z-10">
        <img
          className="w-screen lg:h-[120vh] md:h-screen brightness-50"
          src={BG}
          alt="logo"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
