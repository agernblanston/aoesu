"use client";
import VideoPlayer from '../components/VideoPlayer';
import TextOverlay from '../components/TextOverlay';
import VideoOverlay from '../components/VideoOverlay';

import React, { useRef, useEffect, useState } from 'react';
import ActionList, { Action, requiredInputs } from '../components/ActionList';
import DragSelect from '@/components/DragSelect';
import {Coord } from '@/types/geometry';

export default function Home() {
  const [inputIdx, setInputIdx] = useState(0);
  const [keyPressIdx, setKeyPressIdx] = useState(0);
  const [points, setPoints] = useState<Coord[]>([]);
  const [text, setText] = useState("");
  const [currentRect, setCurrentRect] = useState<{ lo: Coord, hi: Coord } | undefined>(undefined);

  const videoRef = useRef<HTMLVideoElement>(null);

  const updateInputIdx = (newInputIdx: number) => {
    setInputIdx(newInputIdx);
    const req = requiredInputs[newInputIdx];
    if (req.type === 'click') {
      console.log("click", req.coord);
      setPoints([req.coord]);
      setText(req.id ?? "click");
    } else if (req.type === 'drag') {
      console.log("drag", req.box.lo);
      setPoints([req.box.lo, req.box.hi]);
      setText(req.id ?? "drag");
    } else {
      setPoints([]);
      setText(`Hotkey: ${req.sequence.join(',')}` + (req.id ?? ''));
    }
  };

  const onDrag = (rect: { lo: Coord, hi: Coord }) => {
    setCurrentRect(rect);
  };

  const onDragEnd = (rect: { lo: Coord, hi: Coord }) => {
    setCurrentRect(undefined);
    if (requiredInputs[inputIdx].type === "drag") {
      updateInputIdx(inputIdx + 1);
    }
  };

  useEffect(() => {
    updateInputIdx(inputIdx);
  }, []);

  return (
    <div>
      <VideoPlayer
        src="/viper_quickwall.webm"
        width="100%"
        onClick={(coord) => {
          if (requiredInputs[inputIdx].type === "click") {
            updateInputIdx(inputIdx + 1);
          }
        }}
        onDrag={onDrag} // Pass the onDrag handler
        onDragEnd={onDragEnd} // Pass the onDragEnd handler
        onKeypress={(key) => {
          const req = requiredInputs[inputIdx];
          if (req.type === "hotkey" && req.sequence[keyPressIdx] === key) {
            if (keyPressIdx === req.sequence.length - 1) {
              setKeyPressIdx(0);
              updateInputIdx(inputIdx + 1);
            } else {
              setKeyPressIdx(keyPressIdx + 1);
            }
          } else {
            setKeyPressIdx(0);
          }
        }}
        videoRef={videoRef}
      />
      <VideoOverlay points={points} videoRef={videoRef} />
      <TextOverlay text={text} videoRef={videoRef} />
      <DragSelect rect={currentRect} videoRef={videoRef} />
    </div>
  );
}
