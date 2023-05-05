const express = require('express');
const app = express();
app.use (express.json());
const morgan = require('morgan');

const { filmRouter} = require('./film');
app.use("/", filmRouter);

app.listen(4000);
console.log("Sever is listening on")