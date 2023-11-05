'use client';

import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ src, width = '640', height = '360', onInteraction, videoRef}) => {
    const [mouseDownTime, setMouseDownTime] = useState(0);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.1;
        }
    }, []);

    // Function to handle mouse click events
    const handleMouseClick = (event: React.MouseEvent) => {
        if (videoRef.current) {
            const rect = videoRef.current.getBoundingClientRect();

            // You can access the click coordinates with event.clientX and event.clientY
            const xPercent = ((event.clientX - rect.left) / rect.width);
            // Invert the Y coordinate, so 0 is at the bottom
            const yPercent = 1 - ((event.clientY - rect.top) / rect.height);

            const eperc=   { x: xPercent, y: yPercent };
            // console.log(`${event.type},${eperc.x},${eperc.y},${videoRef.current.currentTime}`);
            if (event.type === 'mousedown') {
                setMouseDownTime(Date.now());
            } else {
                const timeElapsed = Date.now() - mouseDownTime;
                if (timeElapsed < 200) {
                    onInteraction('click',eperc);
                } else {
                    onInteraction('drag',eperc);
                }
                setMouseDownTime(0);
            }
        }
    };

    // Function to handle keyboard events
    const handleKeyPress = (event: React.KeyboardEvent) => {
        // You can access the key pressed with event.key
        // console.log(`Key pressed: ${event.key}`);
        onInteraction('keypress', { key: event.key });
    };

    return (
        <div
            tabIndex={0} // tabIndex is needed to make the div focusable to listen to keyboard events
            onKeyDown={handleKeyPress}
            onMouseDown={handleMouseClick}
            onMouseUp={handleMouseClick}
            style={{ outline: 'none' }} // Removes the outline on focus
        >
            <video
                ref={videoRef}
                width={width}
                height={height}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;