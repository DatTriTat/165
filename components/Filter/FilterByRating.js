import { Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../../features/hotel/hotelSlice";
import FilterContext from "../Context/FilterContext";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import StarIcon from "@mui/icons-material/Star";
export default function FilterByRating() {
  // const [value, setValue] = useState();
  const { setRating, setSortRating } = useContext(FilterContext);
  const [countClick, setClickCount] = useState({
    count: 0,
    icon: <ArrowDropDownSharpIcon />,
  });

  const sort = () => {
    setClickCount({ ...countClick, count: countClick.count++ });
    switch (countClick.count) {
      case 1:
        setClickCount({ ...countClick, icon: <ArrowForwardSharpIcon /> });
        setSortRating({ name: "RATING", sortType: "INCREASE" });
        break;
      case 0:
        setClickCount({ ...countClick, icon: <ArrowDropDownSharpIcon /> });
        setSortRating({ name: "RATING", sortType: undefined });
        break;
      case 2:
        setClickCount({ ...countClick, icon: <ArrowBackSharpIcon /> });
        setSortRating({ name: "RATING", sortType: "DECREASE" });
        break;
      case 3:
        setClickCount({
          ...countClick,
          icon: <ArrowForwardSharpIcon />,
          count: 0,
        });
        setSortRating({ name: "RATING", sortType: "INCREASE" });
        break;
    }
  };
  return (
    <div className="flex flex-col pt-4 font-bold space-y-2 ">
      <span className="flex items-center cursor-pointer ml-3" onClick={sort}>
        Guest Rating: <StarIcon fontSize="sm"/>{countClick.icon}
        <StarIcon fontSize="sm"/><StarIcon fontSize="sm" /><StarIcon fontSize="sm"/>
      </span>
      <span className="text-center">
        <Rating
          name="simple-controlled"
          // value={value}
          onChange={(event, newValue) => {
            // setValue(newValue);
            setSortRating({ name: "RATING", sortType: undefined });
            setRating({ name: "RATING", value: newValue });
          }}
        />
      </span>
    </div>
  );
}
