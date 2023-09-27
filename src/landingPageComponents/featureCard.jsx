import React from "react";

export default function FeatureCard({ isActive, onShow }) {
    const styles = {
        feature: {
            flex: isActive ? 6 : 1,
            backgroundSize: isActive ? "contain auto 100%" : "auto 150%"
        }
    };

    return (
        <div className="feature" style={styles.feature} onClick={onShow}>
            <div className="text featureContent">Content</div>
        </div>
    );
}