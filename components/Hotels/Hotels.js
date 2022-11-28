import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHotelsByDestinationId,
  fetchHotelAvailable,
  copyListHotels,
  fetchHotelByDestID,
} from "../../features/hotel/hotelSlice";
import Filter from "../Filter/Filter";
import Hamburger from "../Header/Hamburger";
import Navbar from "../Header/Navbar";
import SearchBox from "../SearchBar/SearchBox";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import HomePage from "../HomePage/HomePage";
import Profile from "./Profile";
import TravelNotice from "./TravelNotice";
import Promotion from "./Promotion";
import { auth } from "../../firebaseConfig";
import useAuth from "../Account/useAuth";
import PropertyCard from "./PropertyCard";
import Link from "next/link";


export default function Hotels(props) {
  const router = useRouter();
  const { hotels, locationName, checkin, checkout } = router.query;
  const dispatch = useDispatch();
  const getCopyListHotel = useSelector((state) => state.hotels.filterHotels);
  const data = useSelector((state) => state.account);
  // const getHotelsDestById = useSelector(
  //   (state) => state.hotels.getHotelByDestinationId.hotels
  // );
  const loadHotels = useSelector(
    (state) => state.hotels.getHotelByDestinationId.isLoading
  );
  useEffect(() => {
    if (loadHotels) {
      dispatch(fetchHotelsByDestinationId(hotels));
    }
  }, [loadHotels, dispatch, hotels]);

  // const PropertyCard = dynamic(() => import("./PropertyCard"), {
  //   suspense: true,
  // });
  const filterHotels = useSelector((state) => state.hotels.filterHotels);
  const variants = {
    loaded: { opacity: 1, transition: { duration: 2 } },
    reload: { opacity: 0, transition: { duration: 0 } },
  };

  if (loadHotels)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
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
        <div
          classNamw="spinner-border animate-spin inline-block w-10 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col h-screen w-full items-center">
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
      <div className="flex flex-row w-full justify-between items-center text-white p-5">
        <div className="flex w-[300px]">
          <Link href="/">
            <span className="font-bold text-[24px] font-mono tracking-widest cursor-pointer">
              LikeHome.com
            </span>
          </Link>
        </div>
        <motion.div
          className="z-20"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <SearchBox />
        </motion.div>
        <span className="mr-5">Welcome to {locationName}</span>
      </div>
      <div className="flex flex-row h-full w-full text-white ml-5 mt-10">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          className="min-h-full w-[300px]"
        >
          <Profile namePage="hotels" />
          <Filter />
          <Promotion />
          <TravelNotice />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="container min-h-screen w-full overflow-auto ml-10"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {getCopyListHotel.map((doc) => (
              <div key={doc.id} className="last:mb-[12rem]">
                <PropertyCard images={doc.images} value={doc} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}