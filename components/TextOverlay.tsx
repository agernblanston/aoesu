'use client'
// TextOverlay.tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface TextOverlayProps {
  text: string;
  isSuccess?: boolean; // Determines the color of the border (green for success, red for failure)
}

const TextOverlay: React.FC<TextOverlayProps> = ({ text, isSuccess }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Fade out effect
  useEffect(() => {
    // Set the text to fade out after 3 seconds
    const timeout = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timeout);
  }, [text]);

  if (!isVisible) {
    return null;
  }

  // Inline styles for the text overlay
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px', // 20 pixels above the bottom of the video
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    padding: '10px',
    border: `2px solid ${isSuccess ? 'green' : 'red'}`,
    borderRadius: '5px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    zIndex: 10, // Ensure it's above the video
    transition: 'opacity 0.5s ease-in-out', // Smooth transition for fading out
    opacity: isVisible ? 1 : 0, // Fade effect
  };

  return ReactDOM.createPortal(
    <div style={overlayStyle}>{text}</div>,
    document.body // Render the component at the end of the body
  );
};

export default TextOverlay;
