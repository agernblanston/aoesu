'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface VideoOverlayProps {
    videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({videoRef}) => {
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
        style={{ position: 'absolute', top: 0, left: 0,     pointerEvents: 'none',     }}
        width={videoDimensions.width}
        height={videoDimensions.height}
        
      >
        {/* Circle */}
        <circle
          cx="100"
          cy="75"
          r="50"
          stroke="#00ff00"
          strokeWidth="2"
          fill="transparent"
          onClick={() => handleShapeClick('circle')}
        />
        {/* Rectangle */}
        <rect
          x="150"
          y="100"
          width="200"
          height="150"
          stroke="#00ff00"
          strokeWidth="2"
          fill="transparent"
          onClick={() => handleShapeClick('rectangle')}
        />
        {/* Polygon */}
        <polygon
          points="300,150 350,200 300,250 250,200"
          stroke="#00ff00"
          strokeWidth="2"
          fill="transparent"
          onClick={() => handleShapeClick('polygon')}
        />
      </svg>
  );
};

export default VideoOverlay;
