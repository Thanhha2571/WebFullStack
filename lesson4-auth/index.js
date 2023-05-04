const express = require('express');
const port = 3000;
const morgan = require('morgan');
const app = express();

const {userRouter} = require('./user');

app.use(express.json());

app.use("/", userRouter);

app.listen(port);
console.log('Starting')