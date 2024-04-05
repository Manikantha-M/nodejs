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

const createTask = asyncWrapper(async(req, res) => {
    const task = await TaskModel.create(req.body)
    res.status(201).json(task); 
})

const getTask =  asyncWrapper(async(req, res) => {
    const id = req.params.id;
    const task = await TaskModel.findOne({_id:id});
    if(!task) return res.status(404).json({msg:'task not found'});
    res.status(200).json({status:true, task});
})

const updateTask =  asyncWrapper(async(req, res) => {
    const {params:{id}, body} = req;
    const task = await TaskModel.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true});
    if(!task) return res.status(404).json({msg:'Could not update'});
    res.status(200).json({status:true, task});  
})

const editTask =  asyncWrapper(async(req, res) => {
    const {params:{id}, body} = req;
    const task = await TaskModel.findOneAndReplace({_id:id}, body, {new:true, runValidators:true});
    if(!task) return res.status(404).json({msg:'Could not PUT'});
    res.status(200).json(task);
});

const deleteTask =  asyncWrapper(async(req, res) => {
    const id = req.params.id;
    const task = await TaskModel.findOneAndDelete({_id:id});
    if(!task) return res.status(404).json({msg:'Could not delete'});
    res.status(200).json(task);
});
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask }