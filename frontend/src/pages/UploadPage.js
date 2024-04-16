import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

import SideNav from "../components/ui/SideNav";


function UploadPage() {
    const userContext = useContext(UserContext);
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
    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();

        try {
            formData.append('title', title);
            formData.append("pathTitle", title.replaceAll(' ', '_') + '_' + Date.now());
            formData.append('uploader', uploader);
            formData.append("video", video);
            formData.append('thumbnail', thumbnail);

            await axios.post("/videos/upload", formData, { headers: { authorization: 'bearer ' + userContext.token } });

        } catch (err) {
            alert(err);
        }
    }

    return (<div>
        <SideNav />
        <div className='page'>
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
        </div>
    </div>)

}

export default UploadPage;