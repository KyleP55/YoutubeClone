import '../../css/main.css';

function VideoPreview({ info, onClick, box }) {
    const url = `/videos/tn/${info.thumbnailPath}`;

    if (info == null) return (<h1>info is null</h1>)

    if (box === true) {
        return (<div className="videoCard" onClick={onClick.bind(this, info._id)}>
            <img src={url} alt="Video Thumbnail" className="thumbnailImage" />
            <div className='cardTextContainer'>
                <h3 className='h1OR'>{info.name}</h3>
                <p className='pOR'>{info.runTime}<br />
                    Uploaded By: {info.uploader}
                </p>
            </div>
        </div>);
    } else {
        return (<div className="horizontalVideoCard" onClick={onClick.bind(this, info._id)}>
            <img src={url} alt="Video Thumbnail" className="horizontalThumbnailImage" />
            <div className='cardTextContainerHorizontal'>
                <h3 className='h1OR'>{info.name}</h3>
                <p className='pOR'>{info.runTime}<br />
                    Uploaded By: {info.uploader}<br />
                    likes: {info.upvotes}
                </p>
            </div>
        </div>);
    }
}

export default VideoPreview;