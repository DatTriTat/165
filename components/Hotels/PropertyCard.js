import { Rating } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import WifiIcon from "@mui/icons-material/Wifi";
import HotTubIcon from "@mui/icons-material/HotTub";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MicrowaveSharpIcon from "@mui/icons-material/MicrowaveSharp";
import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { motion } from "framer-motion";
import Link from "next/link";
export default function PropertyCard({ value }) {
  const amenitiesIcons = [
    { name: "Wifi", icon: <WifiIcon /> },
    { name: "Hot tub", icon: <HotTubIcon /> },
    { name: "Free parking", icon: <LocalParkingIcon /> },
    { name: "Self check-in", icon: <FactCheckIcon /> },
    { name: "Air conditioning", icon: <AcUnitIcon /> },
    { name: "Kitchen", icon: <MicrowaveSharpIcon /> },
  ];

  const detail = {
    id: value.id,
    adults: value.adults,
    images: [...value.images],
    title: value.title,
    listingName: value.listingName,
    listingGuestLabel: value.listingGuestLabel,
    reviews: value.reviewsCount,
    rating: value.starRating ? value.avgRating : 0,
    accessibilityLabel: value.accessibilityLabel,
    price: value.price,
    listingGuestLabel: value.listingGuestLabel,
    amenitiesTitle: value.listingPreviewAmenityNames,
    roomType: value.roomType
  };
  const [imgIndex, setImgIndex] = useState(0);
  // const updateIconAmenities = () => {
  //   value.listingPreviewAmenityNames.map((key) => {
  //     amenitiesIcons.map((doc) => {
  //       if (key === doc.name) {
  //         detail.amenities.push(doc.icon);
  //       }
  //     });
  //   });
  // };
  // // updateIconAmenities();
  const backBtn = (e) => {
    e.preventDefault();
    if (imgIndex == 0) setImgIndex(detail.images.length - 1);
    if (imgIndex > 0) setImgIndex(imgIndex - 1);
  };
  const forwardBtn = (e) => {
    e.preventDefault();
    if (imgIndex == detail.images.length - 1) setImgIndex(0);
    if (imgIndex < detail.images.length - 1) setImgIndex(imgIndex + 1);
  };

  return (
    <div className="flex flex-col h-[300px] w-[300px] rounded-[24px] border-2 border-white bg-yellow-900/50 shadow-lg shadow-blue-500/50">
      <div className="relative h-[300px] w-full overflow-scroll group/book">
        <div className="absolute h-full w-full t-0 l-0 text-black z-10">   
            <div
              className="absolute bottom-3 h-[50px] w-[200px] bg-purple-900/70 rounded-br-[50px] text-center text-white font-bold tracking-wider translate-x-[-200px] group-hover/book:translate-x-[0px] transition duration-700 ease-in-out"
            >
            <Link href={{
              pathname: `../reservation/${value.id}`,
              query: {...detail},
            }} className="cursor-pointer">Reservation</Link>
            </div>
          <div className="flex flex-cols justify-between items-center h-full w-full">
            <div
              className="flex text-indigo-900 h-[30px] w-[30px] bg-white/50 rounded-full justify-center items-center cursor-pointer"
              onClick={backBtn}
            >
              <ArrowBackIos color="inherit" fontSize="medium" />
            </div>
            <div
              className="flex text-indigo-900 h-[30px] w-[30px] bg-white/50 rounded-full justify-center items-center cursor-pointer"
              onClick={forwardBtn}
            >
              <ArrowForwardIos color="inherit" fontSize="medium" />
            </div>
          </div>
        </div>
        <Image
          className="rounded-tl-[24px] rounded-tr-[24px]"
          src={`${detail.images[imgIndex]}`}
          alt="No image found"
          layout="fill"
          objectFit="cover"
          quality={20}
          priority
        />
      </div>
      <div className="flex flex-col h-[100px] w-full bg-white/50 rounded-bl-[24px] rounded-br-[24px] text-sm text-black space-y-1">
        <span className="text-sm text-center w-full">
          {`${detail.title}`} {`(${detail.reviews} reviews)`}
        </span>
        <div className="flex w-full justify-center items-center text-center">
          <Rating
            name="read-only"
            size="small"
            value={detail.rating}
            precision={0.5}
            readOnly
          />
          ({detail.rating})
        </div>
        <span className="text-center">
          {detail.accessibilityLabel}, {detail.listingGuestLabel}
        </span>
      </div>
    </div>
  );
}
