import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import VideoPreview from '../components/ui/VideoPreview';
import SideNav from '../components/ui/SideNav';

function HomePage() {
    const nav = useNavigate();
    const [allVids, setAllVids] = useState(null);

    // Get all Videos
    useEffect(() => {
        async function getVids() {
            try {
                const res = await axios.get('/videos/allVideos');
                setAllVids(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        getVids();
    }, []);

    // Open video on Click
    function onClick(id) {
        nav('video/' + id);
    }

    return (<div>
        <SideNav />
        <div className="page homeVideoBox">
            <h1>Newest Videos</h1>
            <div className='videoGrid'>
                {allVids && allVids.map((i) => {
                    return <VideoPreview info={i} key={i._id} onClick={onClick} box={true} />
                })}
            </div>
        </div>
    </div>)
}

export default HomePage;
