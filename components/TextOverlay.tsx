// components/TextOverlay.tsx
'use client'
import React from 'react';

interface TextOverlayProps {
  text: string;
}

const TextOverlay: React.FC<TextOverlayProps> = ({ text }) => {
  return (
    <div className="text-overlay">
      <p>{text}</p>
      <style jsx>{`
        .text-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white; // Example text color
          pointer-events: none; // Allows clicks to pass through to the video
        }
        p {
          background: rgba(0, 0, 0, 0.5); // Example background for readability
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default TextOverlay;
