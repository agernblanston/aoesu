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
  const [mouseDownTime, setMouseDownTime] = useState<number>(0); // Add this line to define mouseDownTime

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

  const handleMouseDown = (event: React.MouseEvent) => {
    setMouseDownTime(Date.now()); // Update the mouseDownTime here
    const coord = getMousePosition(event);
    setMouseDownCoord(coord);
    setIsMouseDown(true);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (isMouseDown && mouseDownCoord) {
      const coord = getMousePosition(event);
      const timeElapsed = Date.now() - mouseDownTime;
      if (timeElapsed < 200) { // Use the mouseDownTime to calculate the click duration
        onClick(coord);
      } else {
        const rect: Rect = {
          lo: [Math.min(coord[0], mouseDownCoord[0]), Math.min(coord[1], mouseDownCoord[1])],
          hi: [Math.max(coord[0], mouseDownCoord[0]), Math.max(coord[1], mouseDownCoord[1])],
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
        lo: [Math.min(coord[0], mouseDownCoord[0]), Math.min(coord[1], mouseDownCoord[1])],
        hi: [Math.max(coord[0], mouseDownCoord[0]), Math.max(coord[1], mouseDownCoord[1])],
      };
      onDrag(rect);
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
