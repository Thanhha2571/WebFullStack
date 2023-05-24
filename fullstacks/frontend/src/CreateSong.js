import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateSong = () => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const response = await axios.post("http://localhost:4000/admin/edit_song/add", values, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        setSuccess(true)
        console.log(response.data);
    }
    const onFinishFailed = async (errorInfo) => {
        console.log("Failed", errorInfo.message);
    }

    useEffect(() => {
        if (!success) return;
        setSuccess(false);
        navigate("/song-list");
    }, [success])
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please input song's title",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Artist"
                    name="artist"
                    rules={[
                        {
                            required: true,
                            message: "Please input song's artist",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateSong