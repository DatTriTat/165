import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reservationHist, P } from "../../features/account/accountSlice";
import ProfileContext from "../Context/ProfileContext";
import Modify from "./Modify";
import SettingsIcon from "@mui/icons-material/Settings";

function Reservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.account.reservationHist);
  const user = useSelector((state) => state.account);
  const [isOpenRe, setOpenRe] = useState(false);
  const [text, setText] = useState(false);


  const handle = (index) =>{
    user.reservationHist.reservations[index].statusP == "p";
  } 
  console.log(user);
  if (user.email) return <h2>Loading....</h2>;
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <span className="w-full p-4 rounded  text-[24px] mb-10 text-center shadow-xl shadow-white/30">
        Booking History
      </span>

      <table class="table-auto border-separate border-spacing-x-20 border-spacing-y-10 border border-slate-500 rounded-[24px]">
        <thead className="">
          <tr className="text-[24px] tracking-widest text-sky-200">
            <th className="bg-white/10 p-5">#</th>
            <th>Image</th>
            <th>Listing Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center overflow-auto">
          {reservations.reservations.map((value, index) => (
            <tr
              className="text-[20px] font-bold odd:text-orange-300 even: text-pink-100"
              key={index}
            >
              <td>{index + 1}</td>
              <td>
                <Image
                  className="rounded-[36px] ring ring-offset-1"
                  src={value.images[1]}
                  alt="No image found"
                  height="150px"
                  width="150px"
                />
              </td>
              <td>{value.title}</td>
              <td>{value.date[0]}-{value.date[1]}</td>
              <td>{value.accessibilityLabel}</td>
              <td>${value.amount_total / 100}</td>
              <td>
                <span className="flex w-[120px] justify-center items-center ring ring-offset-2 shadow-xl shadow-rose-900/70 rounded-[24px] p-5 bg-green-700/90">
                  {value.statusP}
                </span>
              </td>
              <td>
                <span
                  className="flex w-[120px] text-[24px] justify-center items-center ring ring-offset-2 shadow-xl shadow-yellow-500/70 rounded-[24px] p-5 bg-slate-400/40 cursor-pointer"
                  onClick={handle(index)}
                >
                  cancel{" "}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProfileContext.Provider value={{ isOpenRe, setOpenRe }}>
        {!isOpenRe ? (
          <></>
        ) : (
          <div className="flex w-[1000px]">
            <Modify />
          </div>
        )}
      </ProfileContext.Provider>
    </div>
  );
}

export default Reservation;
