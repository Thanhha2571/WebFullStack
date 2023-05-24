import axios from "axios";
import { Table } from "antd"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
    console.log("Songs", data)
    const handleView = () => {
        data.filter((data)  => {
            navigate(`/song-details/${data._id}`);
        })
        
    }

    const handleUpdate = () => {
        data.filter((data)  => {
            navigate(`/song-update/${data._id}`);
        })
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },

        {
            title: "Artist",
            dataIndex: "artist",
            key: "artist",
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, id) => (
                <>
                  <a onClick={handleView}>View</a>
                  <a onClick={handleUpdate}>Update</a>
                </>
              ),
            },
          ];
        
    return <Table dataSource={data} columns={columns} />
}

export default ListSong;