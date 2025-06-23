import React, { useEffect,useState } from 'react'
import { CiCircleMore } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

import { useDarkThemeContext } from '../context/DarkTheme';
import { useAuthContext } from '../context/authContext';
import randomChatLogo from "../assets/randomChatLogo.png"
import last_24_hrs from "../assets/last_24_hrs.png"
import studyTogether from "../assets/studyTogether.png"
import podium from "../assets/podium.png"
import darkmode from "../assets/darkmode.png"
import lightmode from "../assets/lightmode.png"
import eventsLogo from "../assets/events.png" 
import collabrate from "../assets/collabrate.png"


import axios from "axios"
const Home = () => {


  const API = import.meta.env.VITE_MODE === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PRODUCTION
  const { isDark, setDark } = useDarkThemeContext()
  const { authUser,setAuthUser } = useAuthContext();
  
  const [isSideBarOn, setIsSideBarOn] = useState(false);
  const SwitchDarkMode=()=>{
    if(isDark==="false"){
      setDark("true")
      localStorage.setItem("isDark","true")
    }else{
      setDark("false")
      localStorage.setItem("isDark","false")
    }
  }
  // useEffect(() => {
  //   console.log(import.meta.env.VITE_MODE)
  //   const refreshToken = async () => {
  //     const res = await axios.post(`${API}/api/auth/refreshToken`,{},{withCredentials:true})
  //     console.log(res.data)
  //   }

  //   refreshToken()

  // }, []);
  useEffect(() => {
    console.log(import.meta.env.VITE_MODE);
  
    const refreshToken = async () => {
      try {
        const res = await axios.post(`${API}/api/auth/refreshToken`, {}, { withCredentials: true });
        console.log(res.data);
        localStorage.setItem("lastTokenRefresh", Date.now());
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    };
  
    const checkAndRefreshToken = () => {
      const lastRefresh = localStorage.getItem("lastTokenRefresh");
      const now = Date.now();
      const tenDaysInMs = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
  
      if (!lastRefresh || now - parseInt(lastRefresh) >= tenDaysInMs) {
        // If never refreshed before or 10 days have passed
        refreshToken();
      } else {
        console.log("Token refresh not required yet.");
      }
    };
  
    checkAndRefreshToken(); // Call function to check and refresh if needed
  
  }, []);
  
  const logout =  (e) => {
    localStorage.setItem("authUser",null)
    setAuthUser(null)
    window.location.href="/"


  }
  console.log(isDark)
  return (
    <div> 
    <button  onClick={()=>setIsSideBarOn(true)} className={isDark==="false" ? "text-white absolute   p-2 rounded-lg    top-2 left-0  bg-none  font-bold  " : "text-black absolute  p-2 rounded-lg    top-2 left-0  bg-none font-bold   "}><CiCircleMore className='text-3xl'/>  </button>
    {isSideBarOn && <div className="sideNavigation" onClick={()=>setIsSideBarOn(false)}  ><div className='sideNavigationInner'  ><div className="navElems"><button className='navLinks'  onClick={()=>{window.location.href=`/profile/${authUser._id}`}}    >profile</button> {[{value:"about us",page:"/about-us"},{ value:"contact us ",page:"/contact-us"}, {value:"privacy policy",page:"/privacy-policy"},{value:"Leadboard",page:"/Leadboard"} ].map((item) => {return <button className='navLinks' key={item.value}  onClick={()=>{window.location.href=item.page}}    >{item.value}</button>})} </div><div className="googleAdnav"></div><button className='sideBarButton'  onClick={()=>setIsSideBarOn(false)}  >x</button>   </div></div> }
        
 <button  onClick={SwitchDarkMode}  className={isDark==="false" ? ' text-white absolute border-[1px] p-2 rounded-lg    top-2 right-2  bg-none   ' : " text-black absolute border-[1px] border-black  p-2 rounded-lg    top-2 right-2  bg-none  "}>{isDark==="false"?<img src={lightmode} className='h-7   '  alt="" />:<img src={darkmode} className='h-7'  alt="" />}</button>
      <div className={isDark==="false" ? 'bg-black min-h-screen ' : "bg-white min-h-screen"}  >
        <h1 className='text-2xl text-black text-center h-14 flex items-center justify-center   ' ><span className={isDark==="false"?"text-white":"text-black"}>Welcome &nbsp;</span><span className='text-purple-500'  > stranger </span>🙋🏼‍♂ </h1>
        <div className="navigation mt-[50px]  ">
          <button className={isDark==="false"?"card  text-white  border-[1px] border-white":"card  border-[1px] border-black"} onClick={() => { window.location.href = "/news" }}   ><img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={last_24_hrs} alt="" />Insights</button>
          <button className={isDark==="false"?"card  text-white  border-[1px] border-white":"card  border-[1px] border-black"} onClick={() => { window.location.href = "/study-zone" }}  > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={studyTogether} alt="" />  Study Together</button>
          <button className={isDark==="false"?"card  text-white  border-[1px] border-white":"card  border-[1px] border-black"} onClick={() => { window.location.href = "/events" }}  > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={eventsLogo} alt="" />Events</button>
          <button className={isDark==="false"?"card  text-white  border-[1px] border-white":"card  border-[1px] border-black"} onClick={() => { window.location.href = "/chat" }}> <img className={isDark ? "homeLogos text-white   " : 'homeLogos text-[7px] text-black'} src={randomChatLogo} alt="" />Chat</button>
          <button className={isDark==="false"?"card  text-white  border-[1px] border-white":"card  border-[1px] border-black"} onClick={() => { window.location.href = "/collabrate" }} > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white '} src={collabrate} alt="" />Collaborate</button>
          {/* <button className={isDark==="false"?"card  text-white  border-[1px] border-white":"card  border-[1px] border-black"} onClick={() => { window.location.href = "/Leadboard" }} > <img className={isDark ? "homeLogos text-white" : 'homeLogos text-white'} src={podium} alt="" />Leadboard</button> */}
        </div>
      </div>
    </div>
  )
}

export default Home