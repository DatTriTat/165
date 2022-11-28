import React, { useContext, useState, useEffect } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";

import AccountContext from "../Context/AccountContext";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPass,
  reload,
} from "../../features/account/accountSlice";
import { auth } from "../../firebaseConfig";

function Signup() {
  const dispatch = useDispatch();
  const signUpStatus = useSelector((state) => state.account.signUp.status);
  const { setSignup } = useContext(AccountContext);
  const [Required, setRequired] = useState({
    emailRequired: false,
    passWordRequired: false,
  });
  let copyRequire = { ...Required };
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  let reward = 100;
  const object = { email, pwd, firstname, lastname, phone, reward};
  const handleRequire = (e) => {
    e === "email"
      ? (copyRequire.emailRequired = true)
      : (copyRequire.emailRequired = false);
    e === "password"
      ? (copyRequire.passWordRequired = true)
      : (copyRequire.passWordRequired = false);
    setRequired((Required) => ({
      ...copyRequire,
    }));
  };
  const LoginForm = () => {
    setSignup(false);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (pwd !== matchPwd) {
      alert("passwords do not match");
      return;
    }
    alert("succeed");
    dispatch(createUserWithEmailAndPass(object));
    setSignup(false);
  };
  


  return (
    <div className="backdrop-blur-md bg-white/30 border-4 border-slate-200 rounded-[50px] w-[500px] h-[700px] text-center ml-10">
      <div className="text-black font-bold text-[40px] pt-10 tracking-widest">
        Sign up
      </div>
      <div className="text-black font-bold text-[20px] pt-5 tracking-wider"></div>
      <div className="flex flex-col h-full w-full p-10">
        <div
          className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
          onClick={() => handleRequire("email")}
        >
          <input
            className="rounded-l-full pl-10 h-full w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
          />
          <EmailOutlinedIcon className="mr-5" />
        </div>
        {Required.emailRequired ? (
          <span className="text-left text-rose-900 mt-2">
            Please fill your Email
          </span>
        ) : (
          <></>
        )}
        <div className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c mt-4">
          <input
            className="rounded-l-full pl-10 h-full w-full outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="Phone number"
          />
          <ContactPhoneOutlinedIcon className="mr-5" />
        </div>
        <div className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c mt-4">
          <input
            className="rounded-full pl-10 h-full w-full outline-none"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="First name"
          />
        </div>
        <div className="flex w-[400px] h-[50px] rounded-full border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c mt-4">
          <input
            className="rounded-full pl-10 h-full w-full outline-none"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last name"
          />
        </div>

        <div
          className="flex w-[400px] h-[50px] rounded-full mt-4 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c"
          onClick={() => handleRequire("password")}
        >
          <input
            className="rounded-l-full pl-10 h-full w-full outline-none"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
          />
          <LockOutlinedIcon className="mr-5" />
        </div>
        {Required.passWordRequired ? (
          <span className="text-left text-rose-900 mt-2">
            Please fill your Password
          </span>
        ) : (
          <></>
        )}
        <div className="flex w-[400px] h-[50px] rounded-full mt-4 border border-red-900 bg-white align-center items-center hover:border-4 hover:border-#ea580c">
          <input
            className="rounded-l-full pl-10 h-full w-full outline-none"
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            placeholder="Confirm new password"
          ></input>
          <LockOutlinedIcon className="mr-5" />
        </div>
        <button
          onClick={submit}
          className="w-[400px] h-[50px] rounded-full mt-4 mb-4 text-[20px] bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 font-bold"
        >
          Sign up
        </button>

        <button onClick={LoginForm} className="text-sky-900 underline">
          You have already a LikeHome account?
        </button>
      </div>
    </div>
  );
}

export default Signup;
