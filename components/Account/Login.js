import React, { useContext, useEffect, useState } from "react";
import AccountContext from "../Context/AccountContext";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserWithEmailAndPass,
  callback,
  reservationHist,
} from "../../features/account/accountSlice";
import { useRouter } from "next/router";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "./useAuth";
import { loginUser } from "../../firebaseFunction";

function Login() {
  const user = useAuth();
  const router = useRouter();
  const linkParam = router.query;
  const { setSignup, setForgotpass } = useContext(AccountContext);
  const [userObj, setUserObj] = useState({ email: null, pwd: null });
  const loginStatus = useSelector((state) => state.account.login.status);
  const dispatch = useDispatch();
  const [Required, setRequired] = useState({
    emailRequired: false,
    passWordRequired: false,
  });

  const txt = "Create an account?";
  let copyRequire = { ...Required };

  const handleRequire = (e) => {
    e === "email"
      ? (copyRequire.emailRequired = true)
      : (copyRequire.emailRequired = false);
    e === "password"
      ? (copyRequire.passWordRequired = true)
      : (copyRequire.passWordRequired = false);
    setRequired((Required) => ({
      ...copyRequire,
    }));
  };
  const SignupForm = () => {
    setSignup(true);
  };
  const ResetPassWordForm = () => {
    setForgotpass(true);
  };
  const getEmail = (e) => {
    setUserObj({ ...userObj, email: e.target.value });
  };
  const getPwd = (e) => {
    setUserObj({ ...userObj, pwd: e.target.value });
  };
  const signIn = async (e) => {
    e.preventDefault();
    if (userObj.email && userObj.pwd) {
      dispatch(loginUserWithEmailAndPass(userObj));
      dispatch(reservationHist(userObj.email));
    }
  };

  useEffect(() => {
    if (loginStatus) {
      router.replace("/");
    }
  }, [loginStatus]);

  return (
    <div className="backdrop-blur-md bg-white/30 border-4 border-slate-200 rounded-[50px] w-[500px] h-[600px] text-center ml-10">
      <div className="text-black font-bold text-[40px] pt-10 tracking-widest">
        Sign in
      </div>
      <div className="text-black font-bold text-[20px] pt-5 tracking-wider">
        Login for more Experiences
      </div>
      <div className="flex flex-col h-full w-full p-10 mt-5">
        <div
          className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
          onClick={() => handleRequire("email")}
        >
          <input
            onChange={getEmail}
            className="rounded-l-full pl-10 h-full w-full outline-none"
            placeholder="Email address"
          ></input>
          <EmailOutlinedIcon className="mr-5" />
        </div>
        {Required.emailRequired ? (
          <span className="text-left text-rose-900 mt-2">
            Please fill your Email
          </span>
        ) : (
          <></>
        )}

        <div
          className="flex w-[400px] h-[50px] rounded-full mt-10 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
          onClick={() => handleRequire("password")}
        >
          <input
            type="password"
            onChange={getPwd}
            className="rounded-l-full pl-10 h-full w-full outline-none"
            placeholder="Password"
          ></input>
          <LockOutlinedIcon className="mr-5" />
        </div>
        {Required.passWordRequired ? (
          <span className="text-left text-rose-900 mt-2">
            Please fill your Password
          </span>
        ) : (
          <></>
        )}
        <button
          onClick={signIn}
          className="w-[400px] h-[50px] rounded-full mt-10 mb-4 text-[20px] bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 font-bold"
        >
          Sign in
        </button>
        <button className="text-sky-900 underline" onClick={ResetPassWordForm}>
          Reset your password?{" "}
        </button>
        <button onClick={SignupForm} className="text-sky-900 underline">
          Create an account?
        </button>
      </div>
    </div>
  );
}

export default Login;
