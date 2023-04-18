const {studentRouter} = require('./student');
const {teacherRouter} = require('./teacher');

const express = require('express');
const port = 3000
const morgan = require('morgan');
const app = express();


app.use(express.json())

// app.use(morgan("tiny"));
// const myLogger = function (req, res, next) {
//     console.log("My Logger");
//     next();
// }    

// const checkBody = function (req, res, next) {
//     const body = req.body;
    
//     next();
// }    


// app.use("/student",myLogger);
// app.use ("/teacher",checkBody);



const myCustomerLogger = (name) => {
    return function (req, res, next) {
        console.log("Logger from",name);
        next();
    }
}

app.use ("/teacher",myCustomerLogger("teacher"))
app.use ("/student",myCustomerLogger("student"))

app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(port);
console.log("Starting")