const express = require('express');

const studentRouter = express.Router();

const students = [
    {
        id: 1,
        name: 'John Doe',
        age: 30
    },

    {
        id: 2,
        name: 'Jane Doe',
        age: 20
    }
];

studentRouter.use((req, res, next) => {
    if ((req.method === 'POST') &&
        (!req.body.id || !req.body.name || !req.body.age)) {

        res.send("Thieu du lieu");
        return;
    }

    next();
})

studentRouter.get('/', (req, res) => {
    res.send(students);
});

studentRouter.post('/', (req, res) => {
    console.log(req.body);
    students.push(req.body);
    res.send(students);
});

studentRouter.get('/info', (req, res) => {
    res.send("Student info");
});

module.exports = { studentRouter }