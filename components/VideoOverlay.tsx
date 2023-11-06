'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Coord } from './VideoPlayer';

interface VideoOverlayProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    points?: Coord[];
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({videoRef, points = []}) => {
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

  const updateVideoSize = useCallback(() => {
    if (videoRef.current) {
      setVideoDimensions({
        width: videoRef.current.offsetWidth,
        height: videoRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateVideoSize);
    updateVideoSize(); // Initial size update

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', updateVideoSize);
  }, [updateVideoSize]);

  const handleShapeClick = (shapeName: string) => {
    console.log(`Clicked on shape: ${shapeName}`);
    // Additional logic for when a shape is clicked can be implemented here
  };

  return (
      <svg
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}
        width={videoDimensions.width}
        height={videoDimensions.height}
        
      >
        {points.map((point, index) => (
        <circle
          key={index}
          cx={videoDimensions.width * point[0]}
          cy={videoDimensions.height * (1 - point[1])}
          r="30" // Radius of the circle
          stroke="#00ff00"
          strokeWidth="2"
          fill="transparent"
          onClick={() => handleShapeClick(`circle-${index}`)}
        />
      ))}
        {/* Rectangle */}
        {/* <rect
          x="150"
          y="100"
          width="200"
          height="150"
          stroke="#00ff00"
          strokeWidth="2"
          fill="transparent"
          onClick={() => handleShapeClick('rectangle')}
        /> */}
      </svg>
  );
};

export default VideoOverlay;
