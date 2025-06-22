import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dp from "../assets/dp.png";
import { FaUniversity } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useAuthContext } from "../context/authContext";
import { IoIosLogOut } from "react-icons/io";
import { GoHome } from "react-icons/go";
import axios from "axios";
import { useDarkThemeContext } from "../context/DarkTheme";
import { toast } from "react-toastify";
const ProfilePage = () => {
  // const API = "http://localhost:5000"
  const API =
    import.meta.env.VITE_MODE === "DEVELOPMENT"
      ? import.meta.env.VITE_API_DEV
      : import.meta.env.VITE_API_PRODUCTION;

  const userId = useParams().id;
  const [user, setUser] = useState();
  const { authUser, setauthUser } = useAuthContext();
  const { isDark } = useDarkThemeContext();
  useEffect(() => {
    const getProfile = async () => {
      const res = await axios.get(`${API}/api/user/getProfile/` + userId, {
        withCredentials: true,
      });
      const data = await res.data;
      setUser(data.user);
      console.log(data);
    };
    getProfile();
  }, []);
  const logout = (e) => {
    localStorage.setItem("authUser", null);
    setAuthUser(null);
    window.location.href = "/";
  };
  const handleBlockUser = async () => {
    const res = await axios.post(
      `${API}/api/admin/block-user/${userId}`,
      {},
      { withCredentials: true }
    );
    const data = res.data;
    console.log(data);
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    const username = e.target[0].value.trim();
    if (!username) {
      alert("Username cannot be empty!");
      return;
    }
    //   const res = await axios.post(
    //     `${API}/api/user/updateProfile`,
    //     { username },
    //     { withCredentials: true }
    //   );
    //   if(res.data.error) {
    //     console.log("error",res.data.error);
    //     return;
    // }else{

    //   localStorage.setItem("authUser", JSON.stringify(res.data.user));
    //   setauthUser(res.data.user);
    //   toast.success("username changed");
    // }
    try {
      const res = await axios.post(
        `${API}/api/user/updateProfile`,
        { username },
        { withCredentials: true }
      );
      // Successful request (200 OK)
      localStorage.setItem("authUser", JSON.stringify(res.data.user));
      setauthUser(res.data.user);
      toast.success("Profile updated!");
        window.location.reload();
    } catch (err) {
      if (err.response && err.response.data?.error) {
        toast.error(err.response.data.error); // Shows "Username Taken"
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div
      className={
        isDark === "false" ? "profile bg-black" : "profile bg-white  h-screen "
      }
    >
      <button className="HomeButton">
        <GoHome
          onClick={() => (window.location.href = "/")}
          className={isDark === "false" ? "text-white" : "text-black"}
        />
      </button>
      <div
        className={
          isDark === "false"
            ? "profileHeader border-white "
            : "profileHeader border-black  "
        }
      >
        <img src={dp} alt="" />
        <div className="name_and_insta">
          <h1
            className={
              isDark === "false"
                ? "text-white  w-[250px] overflow-auto"
                : "text-black  w-[250px] overflow-auto"
            }
          >
            {user?.username}
          </h1>
          {user?.instagramLink && (
            <a href={user?.instagramLink} target="_blank" className="instagram">
              <FaInstagram className="instaIcon" />{" "}
              <span
                className={isDark === "false" ? "text-black" : "text-white"}
              >
                {" "}
                instagram.com
              </span>{" "}
            </a>
          )}
        </div>
      </div>
      <div className="profileDetails">
        <FaUniversity
          className={isDark === "false" ? "text-white" : "text-black"}
        />
        <h4 className={isDark === "false" ? "text-white" : "text-black"}>
          {user?.college.name}
        </h4>
      </div>
      {user?._id == authUser._id && (
        <div className="updateProfile">
          <form onSubmit={updateProfile} className="updateForm">
            {" "}
            <input
              type="text"
              placeholder="Update Username"
              maxLength={15}
              className={
                isDark === "false"
                  ? "text-red-500 "
                  : "text-black  outline  bg-transparent"
              }
            />{" "}
            <button
              type="submit"
              className={
                isDark === "false"
                  ? "updateButton text-black bg-blue-300"
                  : " bg-blue-800 text-white tracking-widest"
              }
              id="updateButton"
            >
              Update
            </button>{" "}
          </form>
        </div>
      )}
      {user?.contributions && (
        <h3
          className={
            isDark === "false" ? "contributions text-white" : "text-black"
          }
        >
          Contributions: {user?.contributions}
        </h3>
      )}
      <button className="logoutButton2">
        <IoIosLogOut
          onClick={logout}
          className={isDark === "false" ? "text-white" : "text-black"}
        />{" "}
        <h4 className={isDark === "false" ? "text-white" : "text-black"}>
          {" "}
          Logout
        </h4>{" "}
      </button>
      {authUser.isAdmin && (
        <button className="text-red-500" onClick={handleBlockUser}>
          Block
        </button>
      )}
    </div>
  );
};

export default ProfilePage;
