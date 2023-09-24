import React, { useRef, useEffect } from "react";
const featuresContainer = document.querySelector(".featuresContainer");


function useOutsideAlerter(ref) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                {ref.current.style.flex = "1";}
            }
            else
            {
                {ref.current.style.flex = "4";}
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function FeatureCard() {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const styles = {
        feature:{
            flex: 1
        }
    };

    return (
        <div ref={wrapperRef} className="feature" style={styles.feature}>
            <div className="featureContent">Content</div>
        </div>
    );
}