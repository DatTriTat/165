import React, { useState, useEffect } from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../../features/account/accountSlice";
import {signOutUser}from "../../firebaseFunction";
import { getCurrentUser } from "../../firebaseFunction";
import { callback, reservationHist } from "../../features/account/accountSlice";



function Profile(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const linkParam = router.query;
  const user = useSelector((state) => state.account);
  useEffect(() => {
    getCurrentUser().then((user) => {
      if(!user) return;
      console.log(user);
      dispatch(callback(user));
      dispatch(reservationHist(user.email));
    });
  }, [dispatch]);
  const SignOut = async (e) => {
    e.preventDefault();
    dispatch(userSignOut());
    await signOutUser();

  };
  const Profile = (e) => {
    e.preventDefault();
    router.replace("/profile");
  };
  const SignIn = (e) => {
    e.preventDefault();
    if (!linkParam.id) {
      router.replace({
        pathname: `../account/${linkParam.id}`,
        query: { ...linkParam, namePage: props.namePage },
      });
    } else {
      router.replace("/account");
    }
  };
  return (
    <div className="flex flex-col w-full p-4 bg-yellow-200 border text-black rounded-tl-[24px] rounded-tr-[24px] border border-black font-bold tracking-wider ">
      <div className="flex flex-col w-full justify-center items-center space-y-5">
        <div className="flex justify-center items-center h-[50px] w-[50px] rounded-full text-[48px]">
          <PersonOutlineRoundedIcon fontSize="inherit" />
        </div>
        {!user.login.status ? (
          <span
            className="cursor-pointer text-rose-900 italic underline tracking-wider"
            onClick={SignIn}
          >
            Sign in?
          </span>
        ) : (
          <div className="flex flex-col text-center">
            <span className=" ">Hi, {user.user.firstname}</span>
            <span
              className="cursor-pointer hover:text-slate-900 underline underline-offset-2 cursor-pointer"
              onClick={Profile}
            >
              Profile
            </span>
            <span
              className="cursor-pointer hover:text-slate-900 underline underline-offset-2 cursor-pointer"
              onClick={SignOut}
            >
              Sign Out
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
