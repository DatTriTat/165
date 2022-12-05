import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataBooking, checkDate } from "../../features/hotel/bookingSlice";
import DisplayResult from "./DisplayResult";
import useAuth from "../Account/useAuth";
import { motion } from "framer-motion";
import { reservationHist } from "../../features/account/accountSlice";

function Booking() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const hotelId = router.query.id;
  const dateAvailable = useSelector((state) => state.booking.dateAvailable);
  const dateBooking = useSelector((state) => state.booking.booking.dateBooking);
  const isLoading = useSelector((state) => state.booking.booking.isLoading);
  const [valueCheckIn, onChangeCheckIn] = useState(new Date());
  const [valueCheckOut, onChangeCheckOut] = useState(new Date());
  const reservations = useSelector((state) => state.account.reservationHist);
  const user = useSelector((state) => state.account);

  let checkInDate = {
    date: valueCheckIn.getDate().toString(),
    month: (valueCheckIn.getMonth() + 1).toString(),
    year: valueCheckIn.getFullYear().toString(),
  };
  let checkOutDate = {
    date: valueCheckOut.getDate().toString(),
    month: (valueCheckOut.getMonth() + 1).toString(),
    year: valueCheckOut.getFullYear().toString(),
  };

  useEffect(() => {
    if (reservations.isLoading) {
      if (user.user.email)
      dispatch(reservationHist(user.user.email));
    }
  }, [dispatch, reservations.isLoading, user.user.email]);

  useEffect(() => {
    if (isLoading) dispatch(fetchDataBooking(hotelId));
  });
  if (isLoading && reservations.isLoading) return <h2>Loading......</h2>;

  const submit = (e) => {
    if (!isLoading) dispatch(checkDate({ in: checkInDate, out: checkOutDate }));
    if (user.user.email) dispatch(reservationHist(user.user.email));
  };

 
  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col h-full w-full"
    >
      <div className="flex flex-row w-full justify-center items-center ml-3 drop-shadow-xl">
        <div className="h-full w-[550px] text-center bg-purple-900/40 p-1">
          <span className="font-bold">Check-in</span>
          <DatePicker
            className="design"
            onChange={onChangeCheckIn}
            value={valueCheckIn}
            clearIcon={null}
            dayPlaceholder={`${valueCheckIn.getDate()}`}
            monthPlaceholder={`${valueCheckIn.getMonth()}`}
            yearPlaceholder={`${valueCheckIn.getFullYear()}`}
            minDate={new Date()}
            maxDate={new Date("10/31/2023")}
          />
        </div>
        <div className="h-full w-[550px] text-center bg-purple-900/40 p-1">
          <span className="font-bold">Check-out</span>
          <DatePicker
            className="design"
            onChange={onChangeCheckOut}
            value={valueCheckOut}
            clearIcon={null}
            dayPlaceholder={`${valueCheckOut.getDate()}`}
            monthPlaceholder={`${valueCheckOut.getMonth()}`}
            yearPlaceholder={`${valueCheckOut.getFullYear()}`}
            minDate={valueCheckIn}
            maxDate={new Date("10/31/2023")}
          />
        </div>
        <button
          onClick={submit}
          className="h-[73px] w-[150px] bg-sky-400/40 rounded-tr-[24px] rounded-br-[24px]"
        >
          Search
        </button>
      </div>
      <div className="contain h-full w-[1200px] mx-auto">
        <DisplayResult />
      </div>
    </motion.div>
  );
}

export default Booking;
