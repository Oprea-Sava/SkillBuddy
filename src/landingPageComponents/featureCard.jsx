import React, { useRef, useEffect } from "react";


/*function useOutsideAlerter(ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                detects click outside ref
            }
            
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}*/

export default function FeatureCard({isActive, onShow}) {
    const styles = {
        feature:{
            flex: isActive ? 4 : 1
        }
    };

    return (
        <div className="feature" style={styles.feature} onClick={onShow}>
            <div className="featureContent">Content</div>
        </div>
    );
}