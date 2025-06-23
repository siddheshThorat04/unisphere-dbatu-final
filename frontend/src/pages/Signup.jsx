import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
import { set } from 'mongoose';
import dialogue from '../assets/dialogue.jpg'
// import { useDarkThemeContext } from '../context/DarkTheme';
// import { useDarkThemeContext } from '../context/DarkTheme';
// import eventsLogo from '../assets/events.png'
// import chattingPPLogo from '../assets/chatHomeLogo.png'
// import newsLogo from '../assets/last_24_hrs.png'
import Slider from '../components/Slider';
import { toast } from 'react-toastify';
// import eventsLogo from '../assets/events.png'

const Signup = () => {

  // const mode = import.meta.env.VITE_MODE;
  // const API = mode === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API
  // const API = "http://localhost:5000"
  const API = import.meta.env.VITE_MODE === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PRODUCTION

  const { setauthUser } = useAuthContext();
  const [colleges, setcolleges] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [username2, setUsername] = useState("");
  const [password2, setPassword] = useState("");
  useEffect(() => {
    const username = "User" + Date.now() + Math.floor(Math.random() * 1000);
    const password = "Password" + Date.now() + Math.floor(Math.random() * 1000);
    setUsername(username);
    
    setPassword(password);
    console.log(username, password)
  }, [])
  // const {setDark}=useDarkThemeContext()
  useEffect(() => {
    setIsLoading(true)
    const getCollleges = async () => {
      const res = await axios.get(`${API}/api/admin/getClg`)
      console.log(res.data)
      
      setcolleges(res.data.colleges.sort((a, b) => a.name.localeCompare(b.name)))
      setIsLoading(false)
    }

    getCollleges()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = username2;
    const password = password2;
    const college = e.target[2].value;
    const response = await axios.post(`${API}/api/auth/signup`, { username, password, college }, { withCredentials: true });
    console.log(response.data)
    if (response.data.error) {
      toast.error(response.data.error,{position:"top-center", autoClose: 500 , className:"custom-toast"} );

    } else {
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
      setauthUser(response.data.user);
      toast.success("signed up successfully",{position:"top-center", autoClose: 500 , className:"custom-toast"} );
      localStorage.setItem("mbTheme", false)
    }
  }

  return (
    <div  className='flex flex-col items-center justify-center  bg-white gap-[20px]    '  >
      <h1 className='fontHeading text-3xl text-white' ></h1>
        <Slider  />
      <div className="h-screen ">
        <form onSubmit={handleSubmit} className='loginForm  w-full px-3 ' >

          <div className={showPassword ? "inputContainer2" : "inputContainer2 hidden"}>
            <label htmlFor="username" className='text-white' >what we can call you ?</label>
            <input type="text"  name='username' value={username2} onChange={(e) => setUsername(e.target.value)} placeholder='Enter the username' />
          </div>
          <div className={showPassword ? " hidden inputContainer2" : "inputContainer2 hidden "}>
            <label htmlFor="password" className='text-white'  >Password (keep it short)</label>
            <input type="text" name='password' value={password2} onChange={(e) => setPassword(e.target.value)} placeholder='Enter the password' />
          </div>
          <div className="inputContainer2">
            <label htmlFor="college" className='fontHeading text-sm text-white'  >Select Your College 👇</label>
            <select className='selectCollege' name="college" id="">
              <option>SELECT</option>
              {isLoading && <option>Loading...</option>}
              { !isLoading &&
                colleges.map((clg) => <option className='bg-black' key={clg._id} value={clg._id}>{clg.name}</option>)
              }
            </select>
          </div>
          <button type='submit' className='loginBtn fontHeading text-sm ' disabled={isLoading}   >{isLoading  ? "wait..."   : "join"}</button>

        </form>
        <h1 className='fontHeading text-sm text-black text-center' >Custom Username <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)} /></h1>
        <img className='h-[20vh] dialogue opacity-70 '  src={dialogue} alt="" />
      </div>
    </div>

  )
}

export default Signup
