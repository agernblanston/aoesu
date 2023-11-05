// import YouTubeComponent from '../components/YouTubeComponent';
import VideoPlayer from '../components/VideoPlayer';
import TextOverlay from '../components/TextOverlay';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the RTS Training App</h1>
      <VideoPlayer src="/viper_quickwall.webm" width="1600"/>
      <TextOverlay text="foo" />
      {/* <iframe allow="autoplay" src="https://www.youtube.com/embed/143l4lIeaWc?t=0&autoplay=1&mute=1" title="Bug Week " height="278" data-ytbridge="vidSurrogate2"></iframe> */}
    </div>
  );
}
