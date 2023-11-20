import placeholder2 from "../../assets/paceholder2.png";
import ImageCarousel from "./imageCarousel";
import "../../css/landingPage/hook.css";

function Hook() {
    return (
        <div id="hook">
            <div className="hookContainer">
                <img src={placeholder2} alt="image" />
                <div className="details">
                    <div className="text hookStatement">
                        We provide the
                        <br />
                        best
                        <span className="specialText"> online courses</span>
                    </div>
                    <div className="text hookReason">
                        Embark on a Journey of Lifelong Learning and Skill
                        Development with Our Comprehensive Selection of Online
                        Courses - Your Gateway to Knowledge, Anytime, Anywhere!
                    </div>
                </div>
            </div>
            <div>
                <ImageCarousel />
            </div>
        </div>
    );
}

export default Hook;
