const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')
const fs = require('fs');

app.use(cors())
app.use(express.json());

app.get("/users", (request, response) => {
    const users = fs.readFileSync("users.json");
    response.status(200).send(JSON.parse(users));
});

//create a new user
app.post("/users", (request, response) => {
    //B1: Đọc file
    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    //B2: Lấy data từ body của request
    const data = request.body;
    //B3: Update mảng user
    users.push(data);
    //B4: Lưu lại file
    fs.writeFileSync("users.json", JSON.stringify(users));
    //B5: Gửi data mới update cho client
    response.status(200).send(users);
});

//update user
app.patch("/users/:id", (request, respone) => {
    //get user id
    const id = request.params.id;
    //get data from body
    const new_user = request.body;
    //read file
    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    //find user
    let old_user = users.find((user) => user.id === id);
    //update user
    old_user = {
      ...old_user,
      ...new_user
    };
    //update file
    users.splice(users.indexOf(old_user), 1, old_user);
    //write file
    fs.writeFileSync("users.json", JSON.stringify(users));
    //send response
    respone.status(200).send(users);
});

//delete user
app.delete("/users/:id", (request, response) => {
    //get user id
    const id = request.params.id;
    //read file
    const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
    //find user
    let delete_user = users.find((user) => user.id ===id);
    //delete user
    users.splice(users.indexOf(delete_user), 1);
    //write file
    fs.writeFileSync("users.json", JSON.stringify(users));
    //send response
    response.status(200).send(users);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});