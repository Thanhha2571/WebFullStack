import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const User = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:4000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      setDataSource(data);
    };

    getUsers();
  }, []);
  

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
      render: (data) => {
        return JSON.stringify(data);
      },
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
};

export default User;