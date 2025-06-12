import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDarkThemeContext } from "../context/DarkTheme";
import { useAuthContext } from "../context/authContext";
import { MdDelete } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import dp from "../assets/dp.png";

const Collabrate = () => {
  const { isDark } = useDarkThemeContext();
  const { authUser } = useAuthContext();
  const [isAdding, setIsAdding] = useState(false);
  const [projects, setprojects] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const API =
    import.meta.env.VITE_MODE === "DEVELOPMENT"
      ? import.meta.env.VITE_API_DEV
      : import.meta.env.VITE_API_PRODUCTION;
  useEffect(() => {
    setLoading(true);
    const getProjects = async () => {
      const res = await axios.get(`${API}/api/user/getProjects`);
      const data = res.data;
      setLoading(false);
      setprojects(data.projects.reverse());
      console.log(projects);
    };
    getProjects();
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    setIsAdding(false);
    await axios.post(`${API}/api/user/createProject`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response?.data?.message || "An error occurred"
        );
      });
  };
  const deleteProject = async (id) => {
    const res = await axios.post(`${API}/api/user/deleteProject/${id}`, {
      withCredentials: true,
    });
    const data = await res.data;
    console.log(data);
    window.location.reload();
  };

  return (
    <>
      <div
        className={
          isDark === "false"
            ? "bg-black w-screen h-screen  "
            : "bg-white w-screen h-screen "
        }
      >
        <h1
          className={
            isDark === "false"
              ? "Post_latest_happening text-3xl   mt-[20px]"
              : "Post_latest_happening  text-gray-400   text-3xl "
          }
        >
          Collabrate
        </h1>
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
        <div
          className={
            isDark === "false"
              ? "text-white h-[85vh] overflow-y-scroll "
              : "text-black  h-[85vh] overflow-y-scroll"
          }
        >
          {projects.length === 0 && (
            <h1
              className={
                isDark === "false"
                  ? "Post_latest_happening2 text-white  text-3xl w-[80vw] fixed top-[50%] w-[80vw]   bottom-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]       "
                  : "Post_latest_happening2  text-3xl text-black w-[80vw] fixed top-[50%] bottom-[50%] left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%]       "
              }
            >
              {loading ? (
                <span className="finder animate-bounce inline-block ">🔍</span>
              ) : (
                "Ohh, Such a Empty 😞"
              )}{" "}
              <span
                className={
                  isDark === "false"
                    ? "post_something_na text-white "
                    : "post_something_na text-black"
                }
              >
                Working on Something fun ? Share it.
              </span>
            </h1>
          )}
          {projects?.map((project) => {
            return (
              <div
                key={project?._id}
                className="border-2 border-blue-700 p-2 my-5 mx-2 rounded-lg  "
              >
                <div>
                  <h1
                    className={
                      isDark === "false"
                        ? "text-white text-3xl   "
                        : "text-black text-3xl"
                    }
                  >
                    {project?.title}
                  </h1>
                  <h1
                    className={
                      isDark === "false"
                        ? "text-gray-400 text-2xl    max-h-[200px]  overflow-auto   "
                        : "text-black text-2xl  max-h-[200px]  overflow-auto   "
                    }
                  >
                    {project?.description}
                  </h1>
                  <a href={project?.link} >
                    <h1
                      className={
                        isDark === "false"
                          ? "text-blue-700 text-xl  w-[100%]   overflow-x-scroll "
                          : "text-blue-700 text-xl  w-[100%] overflow-x-scroll  "
                      }
                    >
                      {project?.link}
                    </h1>
                  </a>
                </div>
                {project?.postedBy && (
                  <a
                    href={`/profile/${project?.postedBy?._id}`}
                    className="newsPostedBy"
                  >
                    <img src={dp} alt="" className="postedByDp" />
                    <h5
                      className={
                        isDark === "false"
                          ? "text-white text-sm"
                          : "text-black text-sm"
                      }
                    >
                      {project.postedBy.username}
                    </h5>
                  </a>
                )}
                {/* <a href={`/profile/${project.postedBy?._id}`} className="newsPostedBy"  > <img src={dp} alt="" className='postedByDp'   /> <h5 className={isDark==="false"?"text-white text-sm":"text-black text-sm"}> {project.postedBy?.username}</h5></a> */}
                {(authUser?.isAdmin ||
                  authUser?._id === project?.postedBy?._id) && (
                  <MdDelete
                    onClick={() => deleteProject(project?._id)}
                    className="text-red-500"
                  />
                )}
              </div>
            );
          })}
        </div>
        {isAdding && (
          <div className="bg-black bg-opacity-70 w-screen h-screen fixed top-0 left-0">
            {" "}
            <form
              onSubmit={submit}
              className="addPostForm w-[90vw] absolute top-[50%] left-[50%] translate-x-[-50%] max-w-[600px] translate-y-[-50%] h-[500px]  bg-white pt-10"
            >
              <button className="offButton">x</button>
              <h1 className="Post_latest_happening2 text-3xl text-gray-600 ">
                Publish New Project
              </h1>
              <input
                type="text"
                className="Newsinputs   border-[1px] border-black"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
              />
              <input
                type="text"
                className="Newsinputs   border-[1px] border-black"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Add Description"
              />
              <input
                type="text"
                className="Newsinputs   border-[1px] border-black"
                onChange={(e) => setLink(e.target.value)}
                value={link}
                placeholder="Add Link To Project or Related to it."
              />

              <button type="submit" className="submitbtn">
                submit
              </button>
            </form>
          </div>
        )}
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={
            isDark === "false"
              ? "isAddingBtn border-[1px] border-white text-white"
              : "isAddingBtn border-[1px] border-black text-black "
          }
        >
          +
        </button>
      </div>
    </>
  );
};

export default Collabrate;
