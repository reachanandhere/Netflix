import React from "react";
import lang from "../utils/langaugeConstant";
import { useSelector } from "react-redux";

const GptSearchBar = () => {


  const langKey = useSelector(store=>store?.config?.lang)

  return (
    <div className="pt-[15%] flex justify-center">
      <form className="w-1/2 bg-black ">
        <input
          type="test"
          className="p-4 m-4 w-9/12"
          placeholder={lang[langKey].gptSearchPlacehholder}
        />
        <button className="py-2 px-4 h-14 w-2/12 bg-red-600  text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
