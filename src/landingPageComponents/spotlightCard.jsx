function SpotlightCard({title, content, desc, url}){
    function handleClick(){
        //swap the design with the key features 
    }

    return (
        <div className="sCardContainer" onClick={handleClick}>
            <div className="sCardTitle">{title}</div>
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