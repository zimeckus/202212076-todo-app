const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        id: String,
        text: String,
        day: String,
        reminder: String
    }
,{collection: 'todo'});

const Task = mongoose.model('todo', taskSchema);

module.exports = Task;