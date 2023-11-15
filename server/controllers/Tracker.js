var express = require('express');
var router = express.Router();
let Task = require('../models/Tracker');

// module for displaying the task list
module.exports.displayTasklist = async (req, res, next) => {
    try{
        const TaskList = await Task.find();
        res.render('track/list', {
            title: "Track List",
            TaskList: TaskList
        });
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};

// module for adding new tasks into the tasklist
module.exports.AddTask = (req, res, next) => {
    try{
        res.render('track/add',
        {
            title: 'Add Task'
        })
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};

// module for processing new tasks to be added
module.exports.ProcessTask = (req, res, next) => {
    try{
        let newTask = Task({
            "Course": req.body.Course,
            "Task": req.body.Task,
            "Description": req.body.Description,
            "Deadline": req.body.Deadline
        });
        Task.create(newTask).then(() => {
            res.redirect('/tracklist')
        })
    }

    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};

// module for editing tasks displayed in the table
module.exports.EditTask = async (req, res, next) => {
    try{
        const id = req.params.id;
        const taskToEdit = await Task.findById(id);
        res.render('track/edit',
        {
            title: 'Edit Task',
            Task: taskToEdit
        })
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
    
};

//module for processing edited tasks to be displayed in the table
module.exports.ProcessEditTask = (req, res, next) => {
    try{
        const id = req.params.id;
        let updatedTask = Task({
            "_id": id,
            "Course": req.body.Course,
            "Task": req.body.Task,
            "Description": req.body.Description,
            "Deadline": req.body.Deadline
        })
        Task.findByIdAndUpdate(id, updatedTask).then(() =>{
            res.redirect('/tracklist')
        });
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};

// module for deleting tasks in the table
module.exports.DeleteTask = async (req, res, next) => {
    try{
        let id = req.params.id;
        Task.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/tracklist')
        })
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};
