import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  var handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    //This will called everytime header loads. It needs to be unsubscribe when the component unmounts. Unsubscribe is a function here
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
  return (
    <div className="absolute w-screen px-8 bg-gradient-to-b from-black py-2 z-50 flex justify-between">
      <img className="w-44 brightness-150 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-4">
          {showGPTSearch && (
            <select
              onChange={handleLanguageChange}
              className="w-24 p-2 rounded-lg bg-gray-700 text-white"
            >
              {SUPPORTED_LANGUAGES.map((l) => {
                return (
                  <option key={l.identifier} value={l.identifier}>
                    {l.name}
                  </option>
                );
              })}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 bg-red-600 text-white font-bold rounded-lg"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch ? "Homepage" : 'GPT Search'}
          </button>
          <img className="w-10 h-10" src={user?.photoURL} />
          <button
            onClick={signOutHandler}
            className="font-bold text-white mx-1 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
