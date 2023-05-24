// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import Login from './Login';
// import Register from './Register';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
// });


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>hello app</div>,
//   },

//   {
//     path: "/login",
//     element: <Login/>,
//   },
//   {
//     path: "/register",
//     element: <Register/>,
//   },
// ]);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
// //   <RouterProvider router={router} />
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);