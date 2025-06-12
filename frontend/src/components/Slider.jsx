
import eventsLogo from '../assets/events.png'
import chattingPPLogo from '../assets/chatHomeLogo.png'
import newsLogo from '../assets/last_24_hrs.png'
import logoVideo from '../assets/Global.gif'
import studyTogether from "../assets/studyTogether.png"
import podium from "../assets/podium.png"
const Slider = () => {
    return (
        <div className="slideShow">
            <div className="slider">
            <img src={logoVideo} alt="" />
            <img src={eventsLogo} alt="" /><img src={chattingPPLogo} alt="" /><img src={newsLogo} alt="" />
            <img src={studyTogether} alt="" /><img src={podium} alt="" />
            </div>
            </div>

    );
};

export default Slider;