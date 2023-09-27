import React from "react";

export default function FeatureCard({ isActive, onShow }) {
    const styles = {
        feature: {
            flex: isActive ? 6 : 1,
            backgroundSize: isActive ? " auto 150%" : "auto 200%"
        }
    };

    return (
        <div className="feature" style={styles.feature} onClick={onShow}>
            <div className="text featureContent">Content</div>
        </div>
    );
}