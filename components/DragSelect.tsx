import React from 'react';
import { Coord , Rect} from './VideoPlayer';

interface DragSelectProps {
  rect?: Rect;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const DragSelect: React.FC<DragSelectProps> = ({ rect, videoRef }) => {
  if (!videoRef.current || !rect) {
    return null;
  }

  // Get the bounding rectangle of the video player
  const videoRect = videoRef.current.getBoundingClientRect();
  // Convert start and end coordinates to pixel values based on the video dimensions
  const startX = rect.lo[0] * videoRect.width;
  const startY = (1 - rect.lo[1]) * videoRect.height;
  const endX = rect.hi[0] * videoRect.width;
  const endY = (1 - rect.hi[1]) * videoRect.height;

  // Calculate width and height based on start and end positions
  let width = Math.abs(endX - startX);
  let height = Math.abs(endY - startY);

  // Ensure there is a minimal width and height so the rect is visible even if width or height is zero
  const minWidthHeight = 1; // Minimum width and height of the rectangle
  if (width === 0) {
    width = minWidthHeight;
  }
  if (height === 0) {
    height = minWidthHeight;
  }

  // Calculate the top left position for the SVG rect
  const posX = Math.min(startX, endX);
  const posY = Math.min(startY, endY);

  return (
    <svg style={{
      position: 'absolute',
      left: videoRect.left + window.scrollX, 
      top: videoRect.top + window.scrollY,
      width: videoRect.width,
      height: videoRect.height,
      pointerEvents: 'none',
    }}>
      <rect
        x={posX}
        y={posY}
        width={width}
        height={height}
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default DragSelect;
