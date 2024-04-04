const TaskModel = require('../models/task-model');
const asyncWrapper = require('../middleware/async-wrapper');

// const getAllTasks = async(req, res) => {
//     try {
//         const tasks = await TaskModel.find({});
//         res.status(200).json({status:true, tasks});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }

const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).json({status:true, tasks});
})

const createTask = async(req, res) => {
    try {
        const task = await TaskModel.create(req.body)
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
   
}

const getTask = async(req, res) => {
    try {
        const id = req.params.id;
        const task = await TaskModel.findOne({_id:id});
        if(!task) return res.status(404).json({msg:'task not found'});
        res.status(200).json({status:true, task});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const updateTask = async(req, res) => {
    try {
        const {params:{id}, body} = req;
        const task = await TaskModel.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true});
        if(!task) return res.status(404).json({msg:'Could not update'});
        res.status(200).json({status:true, task});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const editTask = async(req, res) => {
    try {
        const {params:{id}, body} = req;
        const task = await TaskModel.findOneAndReplace({_id:id}, body, {new:true, runValidators:true});
        if(!task) return res.status(404).json({msg:'Could not PUT'});
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteTask = async(req, res) => {
    try {
        const id = req.params.id;
        const task = await TaskModel.findOneAndDelete({_id:id});
        if(!task) return res.status(404).json({msg:'Could not delete'});
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask }