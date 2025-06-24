

import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { VscDebugDisconnect } from "react-icons/vsc";
import { CiHome } from "react-icons/ci";
import { useDarkThemeContext } from "../context/DarkTheme";
import dp from "../assets/dp.png"
import { LuSend } from "react-icons/lu";
import sendSound from "../assets/sendSound.mp3"
import newMessage from "../assets/newMessage.mp3"
import { MdOutlineRestartAlt } from "react-icons/md";



// newww 




//

const API = import.meta.env.VITE_MODE === "DEVELOPMENT" ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PRODUCTION
const socket = io(API);

function Chat() {
  // newww 

  const inputRef = useRef(null)


//

  const [partner, setPartner] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { isDark } = useDarkThemeContext()
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);
  const [mute, setMute] = useState(false);
  // Scroll to bottom whenever a new message is added
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    socket.emit("joinQueue"); // Join queue when component loads

    socket.on("matched", (partnerId) => {
      setPartner(partnerId);
    });
    socket.on("typing", () => {
      setTyping(true);
    });
    socket.on("message", (data) => {
      setTyping(false)
      if (!mute) {
        const audio = new Audio(newMessage);
        audio.play();
      }
      setMessages((prev) => [...prev, data]);
    });

    socket.on("partnerLeft", () => {
      setPartner(null);
      setMessages([]); // Reset messages
      socket.emit("joinQueue"); // Rejoin queue
    });

    return () => {
      socket.emit("leaveChat"); // Leave chat before unmounting
      socket.off("matched");
      socket.off("message");
      socket.off("partnerLeft");
      socket.off("typing");
      socket.off("typing stop");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && partner) {
      if (!mute) {
        const audio = new Audio(sendSound);
        audio.play();
      }
      socket.emit("message", { receiver: partner, message });
      setMessages((prev) => [...prev, { sender: "You", message }]);
      setMessage("");
      inputRef.current?.focus(); // Focus back on the input field after sending a message
    }
  };
  const typingHandle = (e) => {
    if (e.target.value !== "") {
      socket.emit("typing", partner)
    } else {
      socket.emit("typing stop", partner)
    }
  }
  const handleLeaveChat = () => {
    socket.emit("leaveChat");
    
    window.location.reload();
  }

  return (
    <div className={isDark === "false" ? " bg-black p-2 h-screen" : " bg-white p-2 h-screen"}>
      <button className={isDark==="false"?"HomeButton text-white":"HomeButton text-black"}   ><CiHome onClick={() => window.location.href = "/" }/></button>
      
      {partner ? (
        <>
          <div className=" message-container  max-w-[600px]" ref={messagesRef}>
          <div className="w-[70%] m-auto h-1  h-[400px]" >  <h1 className={isDark === "false" ? "text-white text-center mt-10" : "text-black text-center mt-10   "} >connected ✅</h1> <h1 className={isDark === "false" ? "text-white text-center mt-10" : "text-black text-center mt-10  "}>    Nothing is being stored, talk freely !! </h1></div>
            {messages.map((msg, index) => (
              // <p key={index}><b>{msg.sender}:</b> {msg.message}</p>
              <div key={index} className={msg.sender === "You" ? "flex items-center justify-end" : "flex items-center"}  > <span><img className="h-10" src={msg.sender !== "You" ? dp:undefined} alt="" /></span> <p className="bg-gray-100 px-2 py-1 rounded-lg max-w-[70%] message" > {msg.message}</p> </div>
            ))}
            {typing && <p className="text-sm text-gray-500">Partner is typing...</p>}

          </div>
          <div className="flex justify-between  fixed bottom-2 left-0 right-0 items-center mr-1 ml-1"  >
            <span className={isDark === "false" ? " p-1 font-bold rounded-lg text-black bg-blue-700 text-3xl" : "   p-1 font-bold rounded-lg text-black bg-purple-300 text-3xl "} ><MdOutlineRestartAlt onClick={handleLeaveChat} /></span>
            <input
              type="text"
              ref={inputRef}
              value={message}
              onChange={(e) => { setMessage(e.target.value); if(e.target.value!==""){typingHandle(e);}}} 
              className={isDark === "false" ? "m-auto w-[80%] bg-black text-white h-10 text-xl outline-none border-[1px] border-white rounded-lg p-2 " : "m-auto w-[80%] bg-white text-black h-10 text-xl outline-none border-[1px] border-black rounded-lg p-2 "}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              id="msginput"
            />
            <button className={isDark === "false" ? "text-black   text-xl  bg-blue-700  p-2 rounded-lg  " : "text-black   text-xl  bg-purple-300  p-2 rounded-lg   "} onClick={sendMessage}><LuSend /></button>
          </div>
        </>
      ) : (
        <>
        <div className="h-[200px] w-[400px]    border-2 border-red-400  hidden     absolute top-[20%] bottom-[80%] left-[50%] right-[50%] translate-y-[-50%] translate-x-[-50%]   "  ></div>
        <p className={isDark === "false" ? "text-center h-[20%] w-[100%] fixed top-[50%] bottom-[50%] left-[50%] right-[50%]  text-white translate-y-[-50%] translate-x-[-50%] " : "text-center translate-y-[-50%] translate-x-[-50%]  h-[20%] w-[100%] fixed top-[50%] bottom-[50%] left-[50%] right-[50%]  "} >Finding for a match .. <span className="finder animate-bounce inline-block ">🔍</span></p>
        <div className="h-[200px] w-[400px]  hidden border-2 border-red-400   absolute top-[70%] bottom-[50%] left-[50%] right-[50%] translate-y-[-50%] translate-x-[-50%]   "  ></div>
        </>
      )}
    </div>
  );
}

export default Chat;

