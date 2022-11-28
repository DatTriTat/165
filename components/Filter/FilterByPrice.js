import { Box, Slider } from "@mui/material";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../features/hotel/hotelSlice";

import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import FilterContext from "../Context/FilterContext";
export default function FilterByPrice() {
  const { setPrice, setSort } = useContext(FilterContext);
  const [countClick, setClickCount] = useState({
    count: 0,
    icon: <ArrowDropDownSharpIcon />,
  });
  const marks = [
    {
      value: 0,
      label: "0$",
    },
    {
      value: 100,
      label: "100$",
    },
    {
      value: 200,
      label: "200$",
    },
    {
      value: 300,
      label: "300$+",
    },
  ];

  const updateRange = (e, data) => {
    setPrice({ name: "PRICE", value: data });
    setSort({name: "PRICE", sortType: undefined})
  };

  const sort = () => {
    setClickCount({ ...countClick, count: countClick.count++ });
    switch (countClick.count) {
      case 1:
        setClickCount({ ...countClick, icon: <ArrowForwardSharpIcon /> });
        setSort({name: "PRICE", sortType: "INCREASE"})
        break;
      case 0:
        setClickCount({ ...countClick, icon: <ArrowDropDownSharpIcon /> });
        setSort({name: "PRICE", sortType: undefined})
        break;
      case 2:
        setClickCount({ ...countClick, icon: <ArrowBackSharpIcon /> });
        setSort({name: "PRICE", sortType: "DECREASE"})
        break;
      case 3:
        setClickCount({
          ...countClick,
          icon: <ArrowForwardSharpIcon />,
          count: 0,
        });
        setSort({name: "PRICE", sortType: "INCREASE"})
        break;
    }
  };

  return (
    <div className="flex flex-col pt-4 font-bold ml-3">
      <span onClick={sort} className="cursor-pointer">
        Price per nights $ {countClick.icon} $$$
      </span>
      <div className="flex justify-center">
        <Box sx={{ width: 150 }}>
          <Slider
            size="small"
            color="secondary"
            aria-label="Custom marks"
            defaultValue={300}
            onChange={updateRange}
            step={100}
            marks={marks}
            min={0}
            max={300}
          />
        </Box>
      </div>
    </div>
  );
}
