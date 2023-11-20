import React from "react";

export default function FeatureCard( {Component, Feature, Description} ) {

    return (
        <div className="feature" >
            <div className="iconContainer">
                {Component}
            </div>
            <div className="textContainer">
                <div className="featureTitle text subtitleText">{Feature}</div>
                <div className="featureContent text">{Description}</div>
            </div>
        </div>
    );
}