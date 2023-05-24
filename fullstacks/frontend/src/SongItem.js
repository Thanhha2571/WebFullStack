import { useNavigate } from "react-router-dom";
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
        <div>
            <h1>Artist: {artist}</h1>
            <h1>Title: {title}</h1>
            <button onClick={handleView}>View</button>
            <button onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default SongItem