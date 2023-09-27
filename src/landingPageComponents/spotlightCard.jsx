function SpotlightCard({title, content, desc, url}){
    ///const navigate = useNavigate(); use only when the pages are done
    function handleClick(){
        window.location.href = url;
    }

    return (
        <div className="secondary sCardContainer" onClick={handleClick}>
            <div className="text sCardTitle">{title}</div>
            <div className="sContent">
                <img src={content} alt={desc} />
            </div>
        </div>
    )
}

SpotlightCard.defaultProps = {
    title:"Title",
    content:"#",
    desc:"image",
    url:"#"
}

export default SpotlightCard