// import YouTubeComponent from '../components/YouTubeComponent';
"use client"
import VideoPlayer from '../components/VideoPlayer';
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

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <h1>Welcome to the AOESU</h1>
      <VideoPlayer src="/viper_quickwall.webm" width="100%" onClick={(coord)=>{
        if (requiredInputs[inputIdx].type === "click") {
          setInputIdx(inputIdx + 1);
        }
      }} onDrag={(rect)=>{
        if (requiredInputs[inputIdx].type === "drag") {
          setInputIdx(inputIdx + 1);
        }
      }} onKeypress={(key)=>{
        const req = requiredInputs[inputIdx];
        if (req.type === "hotkey") {
          if (req.sequence[keyPressIdx] === key) {
            if (keyPressIdx === req.sequence.length - 1) {
              setKeyPressIdx(0);
              setInputIdx(inputIdx + 1);
            }
          } else {
            setInputIdx(inputIdx + 1);
          }
        }
      }} videoRef={videoRef}/>
      <VideoOverlay videoRef={videoRef}/>
      <TextOverlay text="foo" />
      {/* <iframe allow="autoplay" src="https://www.youtube.com/embed/143l4lIeaWc?t=0&autoplay=1&mute=1" title="Bug Week " height="278" data-ytbridge="vidSurrogate2"></iframe> */}
    </div>
  );
}
