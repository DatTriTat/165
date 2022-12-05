import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import ProfileContext from "../Context/ProfileContext";
import Payment from "./Payment";
import Profile from "./Profile";
import Reservation from "./Reservation";

const PROFILE = "PROFILE"
const RESERVATION = "RESERVATION"
const PAYMENT = "PAYMENT"

function MainProfile() {
  const router = useRouter();
  const [isOpen, setOpen] = useState("PROFILE");
  const signOutHandler = (e) => {
    e.preventDefault();
    auth.signOut();
    router.replace("/");
  };
  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-white">
      <div className="absolute brightness-50 h-full w-full top-0 -z-40">
        <Image
          src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="No image found"
          layout="fill"
          objectFit="cover"
          priority
          quality={10}
        />
      </div>
      <div className="flex flex-row w-full justify-center align-center p-10 text-[24px] text-white font-bold space-x-20 border-b-2 border-white bg-white/10">
        <span className="hover:scale-125 cursor-pointer">
          <Link href="/">Home </Link>
        </span>
        <span className={`hover:scale-125 cursor-pointer ${(isOpen == PROFILE) ? 'underline' : ''} `} onClick={()=> setOpen(PROFILE)}>Profile</span>
        <span className={`hover:scale-125 cursor-pointer ${(isOpen == RESERVATION) ? 'underline' : ''}`} onClick={()=> setOpen(RESERVATION)}> Reservations</span>
        <span className={`hover:scale-125 cursor-pointer ${(isOpen == PAYMENT) ? 'underline' : ''} `} onClick={()=> setOpen(PAYMENT)}> Owner</span>
        <button
          className="flex flex-col justify-center align-center text-white px-4 text-center"
          onClick={signOutHandler}
        ></button>
      </div>
      <ProfileContext.Provider value={{isOpen, setOpen}}>
      {(isOpen == PROFILE) ? <Profile/> : (isOpen == RESERVATION) ? <Reservation/> :<Payment/>}
      </ProfileContext.Provider>
    </div>
  );
}

export default MainProfile;
