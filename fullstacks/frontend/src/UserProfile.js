import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const getUserProfile = async () => {
            const { data } = await axios.get("http://localhost:4000/user/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // console.log("Users", data);
            setUser(data);
        };

        getUserProfile();
    }, []);
    // console.log("Users", user);

    const dataSource = [
        {
            username: user.username,
            role: [user.role]
        }
    ];

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Roles",
            dataIndex: "role",
            key: "roles",
        },
    ];
    return <Table dataSource={dataSource} columns={columns} />;
};



export default UserProfile