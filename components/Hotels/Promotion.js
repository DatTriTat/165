import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { redeem, returnPoint } from "../../features/account/accountSlice";
function Promotion() {
  const dispatch = useDispatch();
  const { point, setPoint } = useContext(UserContext);

  const user = useSelector((state) => state.account);
  console.log(point);
  const Redeem = () => {
    if (!point) { 
    if (user.user.reward >= 100) {
      dispatch(redeem());
      setPoint(true);
    } else {
      return alert("not enough points");
    }} else {
      setPoint(false);
      dispatch(returnPoint());
    }
  };
  return (
    <>
      {!user.login.status ? (
        <div className="flex flex-col items-center w-full bg-white/10 p-2 cursor-pointer">
          <div
            className="h-24 w-24 pr-18 bg-cover overflow-hidden bg-[url('/svg/Discount.svg')]"
            title=""
          ></div>
          <div className="flex flex-col w-full text-[16px]">
            <span className="text-center">Member only</span>
            <span className="text-center">Earn 5% points on booking total</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full text-[16px]">
          <span className="text-center">
            100 points you can redeem to get 5% discount for booking
          </span>
          <span className="text-center">
            ----------------------
          </span>
          <span className="text-center font-bold tracking-wider">{user.user.reward.toFixed(2)} points.</span>

          <button className="text-center" onClick={Redeem}>
            Redeem
          </button>
        </div>
      )}
    </>
  );
}

export default Promotion;
