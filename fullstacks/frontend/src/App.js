// import logo from './logo.svg';
// import './App.css';
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Book from "./Book";
import Author from "./Author";
import AddAuthor from "./AddAuthor";
import AddBook from "./AddBook";
// function App() {
//   const onFinish = async (values) => {
//     console.log("Success:", values);
//     const response = await axios.post("http://localhost:4000/login", values);
//     console.log("response", response);
//   };
//   const onFinishFailed = (errorInfo) => {
  
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <div className="App">
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input your username!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item
//           name="remember"
//           valuePropName="checked"
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//       <Book/>
//     </div>
//   );
// }

function App () {
  return (
    <div>
      {/* <Book/>
      <Author/> */}
      {/* <AddAuthor/> */}
      <AddBook/>
    </div>
  )
}
export default App;
