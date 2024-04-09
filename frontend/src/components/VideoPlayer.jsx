import React, { useRef, useEffect } from "react";

const VideoPlayer = ({videoId}) => {
    const videoRef = useRef(null);

    return (
        <div className="videoPlayer">
        <video ref={videoRef} width="100%" controls autoPlay>
            <source src={`http://localhost:3001/videos/stream/${videoId}`} type='video/mp4'></source >
        </video>
        </div>
    )
}

export default VideoPlayer;