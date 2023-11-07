'use client'
// TextOverlay.tsx
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';

interface TextOverlayProps {
  text: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isSuccess?: boolean; // Determines the color of the border (green for success, red for failure)
}

const TextOverlay: React.FC<TextOverlayProps> = ({ text, videoRef, isSuccess }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Position overlay and fade out effect
  useLayoutEffect(() => {
    if (videoRef.current && overlayRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      overlayRef.current.style.bottom = `${window.innerHeight - videoRect.bottom + 20}px`; // 20 pixels above the bottom of the video
      overlayRef.current.style.left = `${videoRect.left + (videoRect.width / 2)}px`; // Center horizontally
    }
  }, [text, videoRef]);

  // Inline styles for the text overlay
  const overlayStyle: React.CSSProperties = {
    position: 'fixed', // 'fixed' to position relative to the viewport
    transform: 'translateX(-50%)',
    color: 'white',
    padding: '10px',
    border: `2px solid white`,
    // border: `2px solid ${isSuccess ? 'green' : 'red'}`,
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    zIndex: 10, // Ensure it's above the video
    transition: 'opacity 0.5s ease-in-out', // Smooth transition for fading out
    display: text.length > 0 ? 'block' : 'none',
  };

  return (
    <div ref={overlayRef} style={overlayStyle}>
      {text}
    </div>
  );
};

export default TextOverlay;
