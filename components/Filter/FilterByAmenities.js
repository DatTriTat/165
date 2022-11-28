import { Checkbox } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filter } from "../../features/hotel/hotelSlice";
import FilterContext from "../Context/FilterContext";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const listAmenities = [
  "Wifi",
  "Hot tub",
  "Free parking",
  "Self check-in",
  "Air conditioning",
  ,
  "Kitchen",
];
export default function FilterByAmenities() {
  const dispatch = useDispatch();
  const { filterAmenities, setFilterAmenities } = useContext(FilterContext);
  const [amenities, setAmenities] = useState([]);
  const amentitesSelection = (data) => {
    if (amenities.includes(data)) {
      setAmenities(amenities.filter((arr) => arr != data));
    } else {
      setAmenities([...amenities, data]);
    }
  };

  useEffect(() => {
    setFilterAmenities({ name: "AMENITIES", value: amenities });
  }, [dispatch, amenities, setFilterAmenities]);
  return (
    <div className="flex flex-col pt-4  font-bold space-y-2">
      <span className="ml-3">Amenities</span>
      {listAmenities.map((data) => (
        <span key={data}>
          <Checkbox
            onClick={() => amentitesSelection(data)}
            {...label}
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
          {data}
        </span>
      ))}
    </div>
  );
}
// {listAmenities.map((data) => {

// })}
