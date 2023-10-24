import placeholder from "../assets/placeholder.png"
import placeholder2 from "../assets/paceholder2.png"
import ImageCarousel from "./imageCarousel"
import "../css/landingPageCss/hook.css"

function Hook() {


    return (
        <div id="hook">
            <div className="hookContainer">
                <img src={placeholder2} alt="image" />
                <div className="details">
                    <div className="text hookStatement">
                        We provide the<br />
                        best
                        <span className="specialText"> online courses</span>
                    </div>
                    <div className="text hookReason">
                        ajshdjkabdjaba sgd ajsg dajsgdagsgdjas asjgdahgdasdh
                        ashsgdjahfahjkdh gsksjerhkjshdkjf dlkjfdfjhlkdmd
                        ajshdjkabdjaba sgd ajsg dajsgdagsgdjas asjgdahgdasdh
                        ashsgdjahfahjkdh gsksjerhkjshdkjf dlkjfdfjhlkdmd
                    </div>
                </div>
            </div>
            <div>
                <ImageCarousel />
            </div>
        </div>
    )
}

export default Hook
