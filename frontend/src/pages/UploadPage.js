import { useState, useEffect } from "react";
import axios from "axios";

import SideNav from "../components/ui/SideNav";

function UploadPage() {
    const [title, setTitle] = useState("");
    const [uploader, setUploader] = useState("");
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    function onVideoChange(e) {
        setVideo(e.target.files[0]);
    }
    function onThumbnailChange(e) {
        setThumbnail(e.target.files[0]);
    }
    function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append("pathTitle", title.replaceAll(' ', '_') + '_' + Date.now());
        formData.append('uploader', uploader);
        formData.append("video", video);
        formData.append('thumbnail', thumbnail);


        axios.post("/videos/upload", formData, { 'Content-Type': 'multipart/form-data' });
    }

    return (<div>
        <SideNav />
        <div className='formContainer'>
            <form onSubmit={submitHandler}>
                <label>Title:</label><br />
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                /><br />
                <label>Uploader:</label><br />
                <input
                    type="text"
                    onChange={(e) => setUploader(e.target.value)}
                    value={uploader}
                /><br /><br />
                <label>Video:</label><br />
                <input type="file" onChange={onVideoChange} /><br />
                <label>Thumbnail:</label><br />
                <input type="file" onChange={onThumbnailChange} /><br /><br />
                <input type="submit" />
            </form>
        </div>
    </div>)

}

export default UploadPage;