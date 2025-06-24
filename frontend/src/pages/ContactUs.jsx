import React, { useEffect } from 'react';
import { CiHome } from 'react-icons/ci';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useDarkThemeContext } from '../context/DarkTheme';

const ContactUs = () => {
  const { isDark } = useDarkThemeContext();

  useEffect(() => {
    console.log(isDark);
  }, []);

  const isDarkMode = isDark === 'false';

  return (
    <div className={isDarkMode ? 'bg-black h-screen' : 'bg-white h-screen'}>
      <button className="text-black z-100">
        <CiHome
          onClick={() => (window.location.href = '/')}
          className={isDarkMode ? 'HomeButton text-white' : 'HomeButton text-black'}
        />
      </button>

      <h1 className={isDarkMode ? 'text-white text-xl text-center mt-4 fontedHeading' : 'text-black text-xl text-center mt-4 fontedHeading'}>
        Contact Us
      </h1>

      <p className={isDarkMode ? 'text-white text-sm text-center mt-4 fontedPara' : 'text-black text-sm text-center mt-4 fontedPara'}>
        We'd love to hear from you! Reach out on any of our platforms below.
      </p>

      <section className="py-12 px-6 md:px-20">
        <div className="max-w-4xl mx-auto  flex  flex-col  text-center space-y-6">
          <a
            href="https://www.instagram.com/sid__.4216"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex   items-center space-x-2 text-pink-500 hover:underline text-sm"
          >
            <span className= {isDarkMode ? ' text-white' : ' text-black'} >Developer:</span> <FaInstagram />
            <span>@sid__.4216</span>
          </a>
          <a
            href="https://www.linkedin.com/in/siddhesh-thorat-379224295/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex   items-center space-x-2 text-blue-600 hover:underline text-sm"
          >
            <FaLinkedin />
            <span>Siddhesh Thorat on LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/matrics.online"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex   items-center space-x-2 text-pink-500 hover:underline text-sm"
          >
            <span className= {isDarkMode ? ' text-white' : ' text-black'} >Official page:</span><FaInstagram />
            <span>@matrics_updates</span>
          </a>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;
