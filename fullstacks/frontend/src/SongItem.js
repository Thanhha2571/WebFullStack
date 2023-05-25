import { useNavigate } from "react-router-dom";
import "./SongItem.css"
const SongItem = (props) => {
    const navigate = useNavigate()
    const { id, artist, title } = props
    const handleView = () => {

        navigate(`/song-details/${id}`);

    }

    const handleUpdate = () => {

        navigate(`/song-update/${id}`);

    }
    return (
        <div className="project project-tile">
            <p className="project-title">
                <span className="code">Artist: {artist}</span>
                <span className="code">Title: {title}</span>
            </p>
            <button className="buy-course" onClick={handleView}>View</button>
            <button className="buy-course" onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default SongItem