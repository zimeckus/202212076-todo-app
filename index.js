const express = require('express');
const mongoose = require('mongoose');
const Task = require('./schema');
const cors = require('cors');

const app = express();
const dbURL = `mongodb://0.0.0.0:27017/202212076`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
});

app.post('/task', async (req, res) => {
    let task = req.body;
    console.log(task);
    let newTask = new Task({
        id: task.id,
        text: task.text,
        day: task.day,
        reminder: task.reminder
    });

    newTask = await newTask.save();
    res.status(200).json(newTask);
});

app.delete('/task/:id', async (req, res) => {
    let tid = req.params.id;
    let task = await Task.deleteOne({id: tid});
    res.status(200).json({ msg: "Removed Task"});
})

const PORT = 5000;

const startServer = async () => {
    mongoose.connect(dbURL);
    mongoose.connection.on('connected', () => {
        console.log("Connected");
    });
    app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
}

startServer();