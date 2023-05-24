import axios from "axios";
import { Table } from "antd"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongItem from "./SongItem";

const ListSong = (props) => {
    const { data } = props
    // const [song, setSong] = useState([]);
    const navigate = useNavigate()
    // useEffect(() => {
    //     const getSongs = async () => {
    //         const { data } = await axios.get("http://localhost:4000/songs")
    //         console.log(data)
    //         setSong(data)
    //     }

    //     getSongs();
    // }, []);
    // console.log("Songs", data)
    // const handleView = () => {
    //     data.filter((data) => {
    //         navigate(`/song-details/${data._id}`);
    //     })

    // }

    // const handleUpdate = () => {
    //     data.filter((data) => {
    //         navigate(`/song-update/${data._id}`);
    //     })
    // }

    return (
        <div style = {{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gridGap: '4rem',
            width: '100%',
            margin: '0 auto',
        }}>
            {data.map(({ _id,artist, title}) => <SongItem id = {_id}   artist={artist} title={title} />)}
        </div>
    )


}

export default ListSong;