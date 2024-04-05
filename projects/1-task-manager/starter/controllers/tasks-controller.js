const TaskModel = require('../models/task-model');
const asyncWrapper = require('../middleware/async-wrapper');
const {createCustomError} = require('../errors/custom-error');

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

const getTask =  asyncWrapper(async(req, res, next) => {
    const id = req.params.id;
    const task = await TaskModel.findOne({_id:id});
    if(!task) {
        return next(createCustomError('task not found', 404));
    }
    res.status(200).json({status:true, task});
})

const updateTask =  asyncWrapper(async(req, res, next) => {
    const {params:{id}, body} = req;
    const task = await TaskModel.findOneAndUpdate({_id:id}, body, {new:true, runValidators:true});
    if(!task)  return next(createCustomError('Could not update', 404));
    res.status(200).json({status:true, task});  
})

const editTask =  asyncWrapper(async(req, res, next) => {
    const {params:{id}, body} = req;
    const task = await TaskModel.findOneAndReplace({_id:id}, body, {new:true, runValidators:true});
    if(!task)  return next(createCustomError('Could not PUT', 404));
    res.status(200).json(task);
});

const deleteTask =  asyncWrapper(async(req, res, next) => {
    const id = req.params.id;
    const task = await TaskModel.findOneAndDelete({_id:id});
    if(!task)  return next(createCustomError('Could not delete', 404));
    res.status(200).json(task);
});
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask }