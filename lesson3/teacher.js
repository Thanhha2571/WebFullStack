const express = require('express');

const teacherRouter = express.Router();

let teachers = [
    {id:1, name: 'Teacher A', class: '1A'},
    {id:2, name: 'Teacher B', class: '1B'},
    {id:3, name: 'Teacher C', class: '1C'}
]

// teacherRouter.get('/',(req,res) =>{
//     res.send(teachers);
// });
const validator =teacherRouter.use((req, res, next) => {
    if ((req.method === 'POST') &&
        (!req.body.id || !req.body.name || !req.body.class)) {

        res.send("Thieu du lieu");
        return;
    }

    next();
})

teacherRouter.use ((req, res, next) => {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("Request at",time)

    next()
})
// teacherRouter.get('/',(req,res) =>{
//     res.send("Teacher Name");
// })
const adminValidation = (req, res, next) => {
    if(req.headers['x-api-key'] === "admin"){
        next()
    }
    else {
        res.send("Can't access");
        return;
    }
}

const checkExisting = (req, res, next) => {
    let id = req.params.id;
    let teacher = teachers.find(teacher => String(teacher.id) === id);
    if (teacher) {
        next();
    }
    else {
        res.send("Not found");
        return;
    }
}

teacherRouter.delete('/:id', checkExisting, (req, res) =>{
    // let teacher = teachers.find(teacher => String(teacher.id) === req.params.id);
    // teachers.splice(teachers.indexOf(teacher), 1);
    teachers = teachers.filter(teacher => String(teacher.id) !== req.params.id)
    res.send(teachers);
})

teacherRouter.post('/', (req,res) =>{
    teachers.push(req.body)
    res.send(teachers)
})

teacherRouter.get('/',adminValidation,(req,res) =>{
        res.send(teachers);
    });
module.exports = {teacherRouter}