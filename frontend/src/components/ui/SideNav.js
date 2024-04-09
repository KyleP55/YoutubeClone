import { IoHomeOutline, IoAlbumsOutline, IoPersonOutline, IoFilmOutline, IoThumbsUpOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'

import "../../css/sideNav.css";

function SideNav() {

    return (<div className="sideNavContainer">
        <Link to='/'><h3><IoHomeOutline color={"#000"} height="20px" width="20px" /> Home</h3></Link>
        <h3><IoAlbumsOutline color={"#000"} height="20px" width="20px" /> Subscriptions</h3>
        <h3><IoPersonOutline color={"#000"} height="20px" width="20px" /> Your Channel</h3>
        <h3><IoFilmOutline color={"#000"} height="20px" width="20px" /> Your Videos</h3>
        <h3><IoThumbsUpOutline color={"#000"} height="20px" width="20px" /> Liked Videos</h3>

    </div>)
}

export default SideNav;