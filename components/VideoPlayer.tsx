import React, { useState, useEffect } from 'react';

export type Coord = [number, number];
export interface Rect {
  lo: Coord;
  hi: Coord;
}

type VideoPlayerProps = {
  src: string;
  width?: string;
  height?: string;
  onClick: (coord: Coord) => void;
  onDrag: (rect: Rect) => void;
  onDragEnd: (rect: Rect) => void;
  onKeypress: (key: string) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  width = '640',
  height = '360',
  onClick,
  onDrag,
  onDragEnd,
  onKeypress,
  videoRef,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseDownCoord, setMouseDownCoord] = useState<Coord | null>(null);
  const [mouseDownTime, setMouseDownTime] = useState<number>(0);
  const clickThreshold = 200; // Time in milliseconds
  const pixelThreshold = 10; // Pixel movement threshold for click detection

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.1;
    }
  }, [videoRef]);

  const getMousePosition = (event: React.MouseEvent): Coord => {
    const rect = videoRef.current!.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height; // Invert y-axis
    return [x, y];
  };

  const getMouseDistance = (start: Coord, end: Coord): number => {
    const rect = videoRef.current!.getBoundingClientRect();
    const dx = (end[0] - start[0]) * rect.width;
    const dy = (end[1] - start[1]) * rect.height;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setMouseDownTime(Date.now());
    const coord = getMousePosition(event);
    setMouseDownCoord(coord);
    setIsMouseDown(true);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (isMouseDown && mouseDownCoord) {
      const coord = getMousePosition(event);
      const timeElapsed = Date.now() - mouseDownTime;
      const mouseDistance = getMouseDistance(mouseDownCoord, coord);
      
      if (timeElapsed < clickThreshold && mouseDistance < pixelThreshold) {
        onClick(coord);
      } else {
        const rect: Rect = {
          lo: mouseDownCoord,
          hi: coord,
        };
        onDragEnd(rect);
      }
    }
    setIsMouseDown(false);
    setMouseDownCoord(null);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isMouseDown && mouseDownCoord) {
      const coord = getMousePosition(event);
      const rect: Rect = {
        lo: mouseDownCoord,
        hi: coord,
      };
      onDrag(rect);
    }
  };

  // Function to calculate the nearest edge
  const snapToNearestEdge = (coord: Coord): Coord => {
    const rect = videoRef.current!.getBoundingClientRect();
    const x = coord[0] < 0.5 ? 0 : 1; // Snap to left (0) or right (1) edge based on x position
    const y = coord[1] < 0.5 ? 1 : 0; // Snap to top (1) or bottom (0) edge based on y position (inverted y-axis)
    return [x, y];
  };

  // Handler for when the mouse leaves the component
  const handleMouseLeave = (event: React.MouseEvent) => {
    if (isMouseDown && mouseDownCoord) {
      const edgeCoord = snapToNearestEdge(getMousePosition(event));
      const rect: Rect = {
        lo: mouseDownCoord,
        hi: edgeCoord,
      };
      onDragEnd(rect);
      setIsMouseDown(false);
      setMouseDownCoord(null);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    onKeypress(event.key);
  };
  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyPress}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ outline: 'none', width, height }}
    >
      <video
        ref={videoRef}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
