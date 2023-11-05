const VideoPlayer = ({ src, width = '640', height = '360' }) => {
    return (
      <video width={width} height={height} autoPlay muted loop playsInline>
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    );
  };
  
  export default VideoPlayer;