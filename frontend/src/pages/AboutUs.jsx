import React, { useEffect } from 'react'
import { CiHome } from "react-icons/ci";
import { useDarkThemeContext } from '../context/DarkTheme'
const AboutUs = () => {
    const { isDark, setDark } = useDarkThemeContext()
    useEffect(() => {
        console.log(isDark)
    }, [])
  return<div className={isDark === "false" ? "bg-black h-screen" : "bg-white h-screen"}>
    <button className="text-black z-100">
            <CiHome
              onClick={() => (window.location.href = "/")}
              className={
                isDark === "false"
                  ? "HomeButton text-white  "
                  : "HomeButton text-black "
              }
            />
          </button>
    <h1 className={isDark === "false" ? "text-white text-xl  text-center   mt-4  fontedHeading   " : "text-black text-xl  text-center    mt-4 fontedHeading   "}>About Us</h1>
    <p  className={isDark === "false" ? "text-white text-sm  text-center   mt-4  fontedPara   " : "text-black text-sm  text-center    mt-4 fontedPara  "} >Hello Homie 🙋‍♂️,    </p>
    <section className="py-12 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-600 text-lg mb-6">
          Welcome to <strong>matricks</strong> — a digital space built to connect students from across the university. Whether you're looking to collaborate on projects, join events, or simply meet new people, UniSphere brings it all together in one seamless platform.
        </p>
        <p className="text-gray-700 text-lg mb-6">
          With real-time chatting, event sharing, news updates, and academic project support, matricks is designed to empower over 70+ colleges with smarter student interactions and better campus networking.
        </p>
        <p className="text-gray-700 text-lg">
          We’re on a mission to build a vibrant, inclusive, and tech-savvy student community. Join matricks — where your university journey meets innovation.
        </p>
      </div>
    </section>
  </div>
}

export default AboutUs