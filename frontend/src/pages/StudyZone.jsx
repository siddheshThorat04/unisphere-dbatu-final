import React, { useEffect, useState } from 'react'
import { BsWindowSidebar } from 'react-icons/bs';
import { MdGroups } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { redirect } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { useDarkThemeContext } from '../context/DarkTheme';
import { GoHome } from "react-icons/go"
import { FaInstagram } from "react-icons/fa";
import axios from "axios"
const StudyZone = () => {
    // const API= "http://localhost:5000"
    const API = import.meta.env.VITE_MODE === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PRODUCTION
    const { authUser } = useAuthContext()
    const { isDark } = useDarkThemeContext()

    const [meetZone, setMeetZone] = useState([]);
    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await axios.get(`${API}/api/user/getMeet`,{withCredentials:true})

                console.log(res.data);
                setMeetZone(res.data.meet);
            } catch (error) {
                console.log(error);
            }
        }
        getNews()
    }, [])

    const deleteMeet = async (id) => {
        const res = await axios.post(`${API}/api/admin/deleteMeet/${id}`,{withCredentials:true})

        const data = await res.json()
        console.log(data);
    }
    return (
        <div className={isDark==="false" ? 'bg-black min-h-screen ' : "bg-white min-h-screen"}  >
            <button className={isDark === "false" ? "text-black" : ""}  ><GoHome onClick={() => window.location.href = "/"} className={isDark === "false" ?"HomeButton text-white"  :"HomeButton text-balck" } /></button>
            {meetZone.length == 0 && <h1 className={isDark === "false" ? 'studyZoneNoMeet text-black ' : "studyZoneNoMeet  text-gray-200  "}  >Remind Us To Add New Meetings  <a target="_blank" href="https://www.instagram.com/sid__.4216/"><FaInstagram className='inline text-red-500' /></a></h1>}
            <h1 className={isDark === "false" ?  ' studyZoneHeading     w-full text-gray-300 text-3xl h-[10vh]':' studyZoneHeading             w-full text-black text-3xl h-[10vh]    '}  >Study Zone</h1>
            {
                meetZone.map((item) => {
                    return (
                        <div className={isDark === "false" ? '  border-white  border-[1px]  mt-4 rounded-lg  p-2 mr-2 ml-2 ' : '  border-black  border-[1px]  mt-4 rounded-lg  p-2 mr-2 ml-2 ' } key={item._id}  >
                            <div className='flex items-center justify-between w-full' >
                                <div>
                                    <h1 className={isDark === "false" ?"studyZoneSubHeading text-white text-3xl"  :'studyZoneSubHeading text-black text-3xl ' }  >{item.name}</h1>
                                    <button className='studyZoneButton'  ><a href={item.link}>Join</a></button>
                                </div>
                                <MdGroups className={isDark === "false" ? 'text-4xl text-white' : 'text-4xl text-black'} />
                                {authUser.isAdmin && <MdDelete onClick={() => deleteMeet(item._id)} />}
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default StudyZone
