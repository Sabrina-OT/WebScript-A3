var express = require('express');
var router = express.Router();
let Task = require('../models/Tracker');

module.exports.displayTasklist = async (req, res, next) => {
    try{
        const TrackList = await Track.find();
        res.render('track/list', {
            title: "Track List",
            TrackList: TrackList
        });
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};


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

module.exports.ProcessTask = (req, res, next) => {
    try{
        let newTask = Task({
            "Course": req.body.Course,
            "Task": req.body.Task,
            "Description": req.body.Description,
            "Deadline": req.body.Deadline
        });
        Task.create(newTask).then(() => {
            res.redirect('/Tracklist')
        })
    }

    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};

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
            res.redirect('/Tracklist')
        });
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};

module.exports.DeleteTask = async (req, res, next) => {
    try{
        let id = req.params.id;
        Task.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/Tracklist')
        })
    }
    catch(err){
        console.error(err);
        res.render('track/list', {
            error:'error on server'
        });
    }
};
