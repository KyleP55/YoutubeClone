import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import VideoPlayer from "../components/VideoPlayer";
import VideoPreview from "../components/ui/VideoPreview";

function VideoPage() {
    const nav = useNavigate();
    const params = useParams();

    const [info, setInfo] = useState(null);
    const [allVids, setAllVids] = useState(null);

    // Get info
    useEffect(() => {
        async function getInfo() {
            const res = await axios.get(`/videos/info/${params.id}`);
            setInfo(res.data);
            const all = await axios.get('/videos/allVideos');
            setAllVids(all.data);
        }

        getInfo();
    }, [params.id]);

    // Open video on Click
    async function onClick(id) {
        nav('../../video/' + id);
        const res = await axios.get(`/videos/info/${id}`);
        setInfo(res.data);
    }

    useEffect(() => {
        console.log(info)
    }, [info]);


    return (<div className="container">
        <div className="spaceBetween">
            <div className="videoContainer">
                {info && <>
                    <VideoPlayer videoId={info._id} />
                    <h1>{info.name}</h1></>}
            </div>
            <div className="sidePreviewContainer">
                {allVids && allVids.map((i) => {
                    return <VideoPreview info={i} key={i._id} onClick={onClick} box={false} />
                })}
            </div>
        </div>
    </div>)
}

export default VideoPage;