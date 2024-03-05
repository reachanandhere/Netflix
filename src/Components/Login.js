import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG, PROFILE_PICTURE } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleSignInForm = () => {
    setErrorMessage(null);
    setIsSignIn(!isSignIn);
  };
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const handleButtonClick = () => {
    if(fullName?.current?.value?.length<5) return;
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      //Sign Up Logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          updateDetails(userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode - errorMessage);
        });
    }
  };
  const updateDetails = async (userCredential) => {
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: fullName.current.value,
      photoURL: PROFILE_PICTURE,
    });

    const { uid, email, displayName, photoURL } = auth.currentUser;
    dispatch(
      addUser({
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
      })
    );
  };
  return (
    <div>
      <Header />
      <div className="absolute sm:hidden">
        <img
          className="w-screen lg:h-[120vh] md:h-screen brightness-50"
          src={BG}
          alt="logo"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="sm:w-full sm:h-full sm:my-0 md:w-4/12 lg:w-4/12  w-3/12 absolute bg-black my-36 mx-auto right-0 left-0 p-12 text-white md:rounded-lg sm:bg-opacity-100 bg-opacity-70"
      >
        <h1 className="font-bold text-3xl sm:my-8 my-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Enter Full Name"
            minLength="8"
            maxLength="20"
            ref={fullName}
            className="p-2 my-4 h-14 w-full bg-gray-700 rounded-lg"
          />
        )}{" "}
        <br />
        <input
          type="email"
          placeholder="Email Address"
          ref={email}
          className="p-2 my-4 h-14 w-full bg-gray-700 rounded-lg"
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-2 my-4 h-14 w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <br />
        <button
          className="p-4 my-1 bg-red-500 w-full rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {" "}
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn ? (
            <u>New to Netflix? Sign up Now</u>
          ) : (
            <u>Already have an account, Sign In!</u>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
