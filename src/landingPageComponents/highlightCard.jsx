import { useNavigate } from "react-router-dom"



function HighlightCard({title,content,desc,url}){
    ///const navigate = useNavigate(); use only when the pages are done
    function handleClick(){
        window.location.href = url;
    }
    return (
        <div className="cardContainer" onClick={handleClick}>
            <div className="cardTitle">{title}</div>
            <div className="content">
                <img src={content} alt={desc} />
            </div>
        
        </div>
    )
}

HighlightCard.defaultProps = {
    title:"Title",
    content:"#",
    desc:"image",
    url:"#"
}

export default HighlightCard