import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
const SongDetail = () => {
    const { _id } = useParams()
    console.log(_id) 

    const [ song, setSong ] = useState()
    useEffect(() => {
        const getSongDetail = async () => {
            const { data } = await axios.get(`http://localhost:4000/songs/${_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(data)
            setSong(data)
        }
        getSongDetail()
    }, [_id])

    return (
        <div>
            <h1>Song Detail</h1>
            <p>Song's name: {song?.title}</p>
            <p>Song's artist: {song?.artist}</p>
        </div>
    )
}

export default SongDetail





