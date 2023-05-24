// import logo from './logo.svg';
// import './App.css';
// import { Button, Checkbox, Form, Input } from "antd";
// import axios from "axios";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import Book from "./Book";
// import Author from "./Author";
// import AddBook from "./AddBook";
// import AddAuthor from "./AddAuthor";
// import Login from "./Login";
// import Register from "./Register";
// function App() {
//   return (
//     <div className="App">
//       <Login />
//       <Register />
//     </div>
//   );
// }
// export default App;

// function App () {
//   return (
//     <div>
//       {/* <Book/>
//       <Author/> */}
//       <AddAuthor/>
//       {/* <AddBook/> */}
//     </div>
//   )
// }
// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import User from "./User";
import UserProfile from "./UserProfile";
import PrivateRoute from "./PrivateRoute";
import CreateSong from "./CreateSong";
import ListSong from "./ListSong";
import SongDetail from "./SongDetail";
import UpdateSong from "./UpdateSong";
import { useState, useEffect } from "react";
import { useStyleRegister } from "antd/es/theme/internal";
import axios from "axios";
const App = () => {
  const [songData, setSongData] = useState([])
  useEffect (() => {
    const getSongs = async () => {
      const { data } = await axios.get("http://localhost:4000/songs")
      setSongData(data)
    }
    getSongs()
  },[])
  console.log(songData)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/getAllUsers" element={<User />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-song" element= {<CreateSong />}/>
          <Route path="/song-list" element={<ListSong data= {songData} />} />
          <Route path="/song-details/:_id" element={<SongDetail data= {songData}/>}/>
          <Route path="/song-update/:_id" element={<UpdateSong/>}/>
        </Route>
        <Route path="/" element={<>Home</>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;