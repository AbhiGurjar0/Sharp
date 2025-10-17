const express = require('express');
const app = express();

const students = [

    { id: 1, name: "Alice" },

    { id: 2, name: "Bob" },

    { id: 3, name: "Charlie" }

];
const courses = [

    { id: 1, name: "Frontend", description: "HTML, CSS, JS, React" },

    { id: 2, name: "Backend", description: "Node.js, Express, MongoDB" }

];
app.get('/', (reeq, res) => {
    res.send("Welcome to the Student & Course Portal API!");
})
app.get('/students', (req, res) => {
    let Student = students.map(st => st.name)
    res.send(Student);
});
app.get('/students/:id', (req, res) => {
    if (req.params.id <= 0 || req.params.id > 3)
        res.send("Student Not Found");
    let index = req.params.id;
    index--;
    let studenName = students[index].name
    res.send(`Student Name is ${studenName}`);
});
app.get('/courses', (req, res) => {
    res.send(courses);
});
app.get('/courses/:id', (req, res) => {
    if (req.params.id <= 0 || req.params.id > 3)
        res.send("Course Not Found");
    let index = req.params.id;
    index--;
    let coursName = courses[index].name;
    res.send(`Course Name is ${coursName}`);
});

module.exports = app;