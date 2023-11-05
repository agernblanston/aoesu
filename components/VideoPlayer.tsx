'use client';

import React, { useRef, useEffect, useState } from 'react';

export type Coord = [number, number];
interface Rect {
    lo: Coord;
    hi: Coord;
}

type VideoPlayerProps = {
    src: string;
    width?: string;
    height?: string;
    onClick: (coord: Coord) => void;
    onDrag: (coord: Rect) => void;
    // TODO modifiers
    onKeypress: (key: string) => void;
    videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, width = '640', height = '360', onClick, onDrag, onKeypress, videoRef }) => {
    const [mouseDownTime, setMouseDownTime] = useState(0);
    const [mouseDownCoord, setMouseDownCoord] = useState([-1, -1]);

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

            const eperc = [xPercent, yPercent] as Coord;
            // console.log(`${event.type},${eperc.x},${eperc.y},${videoRef.current.currentTime}`);
            if (event.type === 'mousedown') {
                setMouseDownTime(Date.now());
                setMouseDownCoord(eperc);
            } else {
                const timeElapsed = Date.now() - mouseDownTime;
                if (timeElapsed < 200) {
                    onClick(eperc);
                } else {
                    onDrag({ lo: [Math.min(eperc[0]), Math.min(mouseDownCoord[0])], hi: [Math.max(eperc[1]), Math.max(mouseDownCoord[1])] });
                }
                setMouseDownTime(0);
            }
        }
    };

    // Function to handle keyboard events
    const handleKeyPress = (event: React.KeyboardEvent) => {
        // You can access the key pressed with event.key
        // console.log(`Key pressed: ${event.key}`);
        onKeypress(event.key);
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