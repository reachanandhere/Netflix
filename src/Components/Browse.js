import React from "react";
import Header from "./Header";
import useFetchNowPlayingMovies from "../customHooks/useFetchNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  
  useFetchNowPlayingMovies()
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
