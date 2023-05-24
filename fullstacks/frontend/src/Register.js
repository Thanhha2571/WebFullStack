import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";

const Register = () => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        // console.log("Success:", values);
        const response = await axios.post("http://localhost:4000/register", values);
        // console.log("response", response);
        setSuccess(true)
    };
    const onFinishFailed = (errorInfo) => {

        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        if (!success) return;
        setSuccess(false);
        navigate("/login");
    }, [success]);
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
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
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
};

export default Register;