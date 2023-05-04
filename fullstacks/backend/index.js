// const express = require('express');
// const mongoose = require('mongoose');
// const port = 3000;
// const morgan = require('morgan');
// const app = express();
// const cors = require('cors');
// app.use (express.json())
// app.use(cors())
// mongoose.connect('mongodb://localhost:27017/mindx')

// const userSchema = new mongoose.Schema ({
//     name: String,
//     age: Number,
// })

// const userModel =  mongoose.Model("users", userSchema);

// app.get('/', (req, res) => {
//     res.status(200).send("OK");
// })

// app.patch ('/user/:id', async (req, res) => {
//     let id = req.params.id;
//     const user = await userModel.findbyId(iq);

//     user.name = req.body.name;
//     user.age = req.body.age;

//     await user.save();

//     res.status(200).send(user)

// })
// app.post ('/', async (req, res) => {
//     const body = req.body;
//     const user = await userModel.create(body)
//     res.status(200).send(user)
// });
// app.get('/users', async (req, res) => {
//     const user = await userModel.find({})
//     res.status(200).send(user)
// });
// app.listen(port);
// console.log('Starting')


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
mongoose.connect("mongodb://localhost:27017/mindx");
// mongoose.connect("mongodb://127.0.0.1:27017/mindx");
// mongoose.connect("mongodb://0.0.0.0:27017/mindx");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  
});

const userModel = mongoose.model("users", userSchema);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.post("/users", async (req, res) => {
  const body = req.body;
  const user = await userModel.create(body);
  res.status(200).send(user);
});

app.get("/users", async (req, res) => {
  const users = await userModel.find({}); // Tìm tất cả user
  res.status(200).send(users);
});

app.patch("/users/:id", async (req, res) => {
  // Tìm thằng user có id = id ở params => const user = await userModel.findById(....)
  const id = req.params.id; //6447d2e89cadd58c1b59e526
  const user = await userModel.findById(id);
  // Cập nhật data lấy từ req.body => user. = ...
  user.name = req.body.name;
  user.age = req.body.age;
  // Lưu lại user => user.save()
  await user.save();
  // Gửi lại user cho client
  res.status(200).send(user);
});

app.delete("/users/:id", async (req, res) => {
  // Tìm thằng user có id = id ở params => const user = await userModel.findById(....)
  const id = req.params.id; //6447d2e89cadd58c1b59e526
  const user = await userModel.findById(id);
  // Xoá user
  await userModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  res.status(200).send("OK");
});

app.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const token = jwt.sign({username:body.username}, "PRIVATE KEY", {expiresIn: "1h"})
    console.log({token});
    res.send({token: token});
  } catch (error) {
    res.send("ERROR");
  }
});

app.listen(4000);
console.log("Server is running");