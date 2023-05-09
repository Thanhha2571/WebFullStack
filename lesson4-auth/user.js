const express = require('express');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

const users = [
  { 'id': 1, 'username': 'Ha', 'password': 'Ha1234' },
  { 'id': 2, 'username': 'Nam', 'password': 'Nam1234' },
  { 'id': 3, 'username': 'Son', 'password': 'Son1234' },
  { 'id': 4, 'username': 'Thai', 'password': 'Thai1234' }
];

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    var decoded = jwt.verify(token, 'key');
    if (decoded) {
      users.username = decoded.username
      next()
    }
  } catch (err) {
    res.status(401).send("Invalid Token")
  }
};

userRouter.get('/get-all-users', verifyUser, (req, res) => {
  res.send(users);
});

const enterAccount = userRouter.use((req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).send("Please enter a username and/or password");
  }
  next();
  next();

})
userRouter.post('/login', enterAccount, (req, res) => {
  const { username, password } = req.body;
  let user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).send("User not found");
  }
  if (user.password !== password) {
    return res.status(401).send("Wrong password");
  }
  const token = jwt.sign({ id: user.id, username: user.username }, "key", { expiresIn: "1h" })
  res.send({ token })
});
// userRouter.get('/login-with-jwt', enterAccount, (req, res) => {
//     res.send("Login successful");
// });
module.exports = { userRouter };