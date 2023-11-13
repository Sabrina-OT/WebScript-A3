let mongoose = require('mongoose');

//create a model class
let taskModel = mongoose.Schema({
    Course:String,
    Task:String,
    Description:String, 
    Deadline:String
},
{
    collection:"Tracker"
});

module.exports = mongoose.model('Task', taskModel);
