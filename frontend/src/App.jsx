
import {  Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Home from "./pages/Home";


import { useAuthContext } from "./context/authContext.jsx";
import News from "./pages/News.jsx";
import StudyZone from "./pages/StudyZone.jsx";
import Admin from "./pages/Admin.jsx";
import Events from "./pages/Events.jsx";
import Leadboard from "./pages/Leadboard.jsx";
import Collabrate from "./pages/Collabrate.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

function App() {
	const {authUser, setauthUser}=useAuthContext()	
	return (
		<>

			<Routes>
				<Route path='/' element={ authUser?<Home/>	:  <Signup />} />
				<Route path='/news' element={<News/>} />
				<Route path='/study-zone' element={<StudyZone/>} />
				<Route path='/OnlyForAdmin' element={<Admin/>} />
				<Route path='/events' element={<Events/>} />
				<Route path='/chat' element={<Chat/>} />
				<Route path='/Leadboard' element={<Leadboard/>} />
				<Route path="/profile/:id" element={<ProfilePage />} />
				<Route path='/collabrate' element={<Collabrate/>} />
				<Route path='/about-us' element={<AboutUs/>} />
				<Route path='/contact-us' element={<ContactUs/>} />
				<Route path='/privacy-policy' element={<PrivacyPolicy/>} />
			</Routes>
		</>
	);
}


export default App;
