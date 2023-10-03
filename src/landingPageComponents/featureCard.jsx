import React from "react";

export default function FeatureCard({src}) {
    
    return (
        <div className="feature" >
            <div className="featureInner">
                <div className="featureFront">
                    <img src={src}></img>
                </div>
                <div className="featureBack">
                    <img src={src}></img>
                    <div className="featureContent">
                        <h2>Text</h2>
                        <h3>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}