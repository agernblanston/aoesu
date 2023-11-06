// import YouTubeComponent from '../components/YouTubeComponent';
"use client"
import VideoPlayer, {Coord} from '../components/VideoPlayer';
import TextOverlay from '../components/TextOverlay';
import VideoOverlay from '../components/VideoOverlay';

import React, { useRef, useEffect, useState} from 'react';
import ActionList, {Action, requiredInputs} from '../components/ActionList';

// const requiredActions = [
  // Drag select 2 vills (second one is optional)
  // hotkey - palisade
  // Click create palisade
  // Click attack militia
  // Drag select 4 vills
  // Click attack scout
  // Drag select (or click) vill
  // Click vill left + upward (to walk)
  // Click vill to tc
  // hotkey - palisade
  // click create palisade
  // drag select or click (buggy) vill
  // click repair palisade -she bugs out
  // drag select two vills
  // click attack militia
  // click (repairing) vill
  // click walk left
  // hotkey - palisade
  // click palisade
  // hotkey - palisade
  // drag select or click ANY of 4 villagers 
  // click palisade
  // drag select ANY of 3 vills
  // click repair palisade

  // Add more required actions as needed
// ];

export default function Home() {
  const [inputIdx, setInputIdx] = useState(0);
  const [keyPressIdx, setKeyPressIdx] = useState(0);
  const [points, setPoints] = useState<Coord[]>([]); // Define points state
  const [text, setText] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const updateInputIdx = (newInputIdx: number) => {
    setInputIdx(newInputIdx);
    const req = requiredInputs[newInputIdx];
    if (req.type === 'click') {
      console.log("click", req.coord);
      setPoints([req.coord]);
      setText("Click");
    } else if (req.type === 'drag') {
      console.log("drag", req.box.lo);
      setPoints([req.box.lo, req.box.hi]);
      setText("Drag");
    } else {
      setPoints([]);
      setText(`Hotkey: ${req.sequence.join(',')}`);
    }
  };

  useEffect(() => {
    updateInputIdx(inputIdx);
  }, []);

  return (
    <div>
      <h1>Welcome to the AOESU</h1>
      <VideoPlayer src="/viper_quickwall.webm" width="100%" onClick={(coord)=>{
        if (requiredInputs[inputIdx].type === "click") {
          updateInputIdx(inputIdx + 1);
        }
      }} onDrag={(rect)=>{
        if (requiredInputs[inputIdx].type === "drag") {
          updateInputIdx(inputIdx + 1);
        }
      }} onKeypress={(key)=>{
        const req = requiredInputs[inputIdx];
        if (req.type === "hotkey") {
          if (req.sequence[keyPressIdx] === key) {
            if (keyPressIdx === req.sequence.length - 1) {
              setKeyPressIdx(0);
              updateInputIdx(inputIdx + 1);
            }
          } else {
            updateInputIdx(inputIdx + 1);
          }
        }
      }} videoRef={videoRef}/>
      <VideoOverlay points={points} videoRef={videoRef}/>
      <TextOverlay text={text} />
    </div>
  );
}
